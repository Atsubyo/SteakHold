import mesa
import numpy as np

class CowAgent(mesa.Agent):
    def __init__(self, model, weight, market_value):
        super().__init__(model)
        self.age = 0
        self.weight = weight
        self.alive = True

    def gainWeight(self):
        self.weight += np.random.normal(2, 0.1)
    
    def move(self):
        pass

    def step(self):
        self.gainWeight()
        self.move()  
