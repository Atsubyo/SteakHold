import mesa
from agent import CowAgent

class CowModel(mesa.Model):
    def __init__(self, n, width=10, height=10):
        super().__init__()
        self.num_agents = n
        self.grid = mesa.space.MultiGrid(width, height, True)
        self.schedule = mesa.time.RandomActivation(self)

        for i in range(self.num_agents):
            cow = CowAgent(self)
            self.schedule.add(cow)

            # Place randomly on grid
            x = self.random.randint(0, width - 1)
            y = self.random.randint(0, height - 1)
            self.grid.place_agent(cow, (x, y))

    def step(self):
        self.schedule.step()
