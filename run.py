import mesa
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from agent import CowAgent
from model import CowModel


def cow_portrayal(agent):
    if agent is None:
        return
    
    color_map = {"healthy": "green", "sick": "orange", "dead": "red"}
    return {
        "Shape": "circle",
        "Filled": "true",
        "Color": color_map[agent.health],
        "r": 0.8
    }

num_cows = 20
model = CowModel(num_cows)

health_counts = []
profits = []

for day in range(10):
    model.step()
    
    healthy = sum(1 for a in model.schedule.agents if a.health == "healthy")
    sick = sum(1 for a in model.schedule.agents if a.health == "sick")
    dead = sum(1 for a in model.schedule.agents if a.health == "dead")
    
    daily_profit = sum(a.sell() for a in model.schedule.agents)
    
    health_counts.append([day, healthy, sick, dead])
    profits.append(daily_profit)
    
    print(f"Day {day}: Profit = {daily_profit}, Healthy: {healthy}, Sick: {sick}, Dead: {dead}")


df = pd.DataFrame(health_counts, columns=["Day", "Healthy", "Sick", "Dead"])

plt.figure(figsize=(10, 5))
plt.plot(df["Day"], df["Healthy"], label="Healthy", color="green")
plt.plot(df["Day"], df["Sick"], label="Sick", color="orange")
plt.plot(df["Day"], df["Dead"], label="Dead", color="red")
plt.xlabel("Day")
plt.ylabel("Number of Cows")
plt.legend()
plt.title("Cow Health Over Time")
plt.show()

plt.figure(figsize=(10, 5))
plt.plot(range(10), profits, label="Profit", color="blue")
plt.xlabel("Day")
plt.ylabel("Total Profit")
plt.title("Profit Over Time")
plt.show()
