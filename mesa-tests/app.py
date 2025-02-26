import math
import random
from mesa import Model
from mesa.datacollection import DataCollector
from mesa.experimental.devs import ABMSimulator
from mesa.experimental.cell_space import OrthogonalVonNeumannGrid
from mesa.experimental.cell_space import CellAgent
from mesa.time import RandomActivation
from mesa.visualization import Slider, SolaraViz, make_plot_component, make_space_component

class Cow(CellAgent):
    """A cow that moves randomly, gains weight over time, and has a chance of dying."""

    def __init__(self, model, weight=100, cell=None):
        super().__init__(model)
        self.weight = weight
        self.cell = cell
        self.dead = False  # Add a "dead" attribute to the cow

    def step(self):
        """Move randomly, gain weight, and possibly die."""
        if self.dead:
            return

        # 3% chance of dying
        if random.random() < 0.001:
            self.dead = True
            self.color = "red"  # Change color to red for dead cows
            self.model.dead_cows += 1  # Increment the dead cows count
            return

        # Normal distribution for weight gain (mu=2, sigma=0.5)
        weight_gain = random.gauss(2, 0.5)
        self.weight += weight_gain

        self.move()

    def move(self):
        """Move to a random neighboring cell."""
        self.cell = self.cell.neighborhood.select_random_cell()


class CowModel(Model):
    """A simple livestock simulation model with cows moving, gaining weight, and possibly dying."""

    def __init__(self, width=100, height=100, initial_cows=5, seed=None, simulator=None):
        super().__init__(seed=seed)
        self.simulator = simulator or ABMSimulator()
        self.simulator.setup(self)
        self.schedule = RandomActivation(self) 
        self.initial_cows = initial_cows
        self.calf_weight = 50

        self.width = width
        self.height = height
        self.grid = OrthogonalVonNeumannGrid(
            [self.height, self.width], torus=True, capacity=math.inf, random=self.random
        )

        self.dead_cows = 0  # Track the number of dead cows
        self.cows = []
        for _ in range(initial_cows):
            cell = self.random.choice(self.grid.all_cells.cells)
            cow = Cow(self, weight=100, cell=cell)
            self.cows.append(cow)
            self.schedule.add(cow)
        self.running = True

        self.datacollector = DataCollector(
            model_reporters={
                "Cow Count": lambda m: len([cow for cow in m.schedule.agents if not cow.dead]),
                "Avg Weight": lambda m: sum(cow.weight for cow in m.schedule.agents if not cow.dead) / len([cow for cow in m.schedule.agents if not cow.dead]),
                "Dead Cow Count": lambda m: m.dead_cows, 
                "Herd Market Price": lambda m: sum(cow.weight for cow in m.schedule.agents if not cow.dead)
                if len([cow for cow in m.schedule.agents if not cow.dead]) > 0 else 0
            }
        )

    def step(self):
        """Advance the model by one step."""
        self.schedule.step()
        self.datacollector.collect(self)


# Visualization setup
def cow_portrayal(agent):
    if agent is None:
        return
    if agent.dead:
        return {"color": "red", "marker": "o", "size": 50, "zorder": 2}  # Red circle for dead cows
    return {"color": "brown", "marker": "o", "size": 50, "zorder": 2}

# Set up visualization components
space_component = make_space_component(cow_portrayal, draw_grid=True)
lineplot_component1 = make_plot_component({"Avg Weight": "blue"})
lineplot_component2 = make_plot_component({"Cow Count": "red", "Dead Cow Count": "black"})
lineplot_component3 = make_plot_component({"Herd Market Price": "green"})

simulator = ABMSimulator()

model_params = {
    "seed": {
        "type": "InputText",
        "value": 42,
        "label": "Random Seed",
    },
    "initial_cows": Slider("Initial Cows", 20, 5, 100),
    "calf_weight": Slider("Initial Calf Weight", 50, 1, 60),
    "calf_sale_price": Slider("Calf Sale Price $/cwt", 120, 1, 140),
}

def create_model():
    return CowModel(simulator=simulator, initial_cows=model_params["initial_cows"].value)

model = create_model()
page = SolaraViz(
    model, components=[space_component, lineplot_component1, lineplot_component2, lineplot_component3], model_params=model_params, name="Cow Livestock Simulator", simulator=simulator
)
