import CowAgent from "./CowAgent";

class OperationModel {
  constructor(
    initial_weight,
    num_cows,
    growth_rate,
    death_rate,
    max_days,
    sale_price
  ) {
    this.cows = [];
    this.dead_cows = 0;
    this.sold_cows = 0;
    this.revenue = 0;
    this.expenses = 0;
    this.initial_weight = initial_weight;
    this.num_cows = num_cows;
    this.growth_rate = growth_rate / 2; // ADG (average daily gain);
    this.death_rate = death_rate;
    this.daily_death_rate = 1 - Math.pow(1 - death_rate, 1 / max_days);
    this.max_days = max_days;
    this.target_weight = max_days * growth_rate + initial_weight;
    this.sale_price = sale_price;
  }

  addCow(cow = null) {
    if (cow) {
      this.cows.push(cow);
      return;
    }
    const newCow = new CowAgent(this.cows.length + 1, this.initial_weight);
    this.cows.push(newCow);
  }

  step() {
    this.cows.forEach((cow) => {
      cow.grow(this.growth_rate);
      cow.move();
      if (this.daily_death_rate > Math.random()) {
        cow.die();
        this.dead_cows++;
      }
      if (cow.weight >= this.target_weight) {
        this.sellCow(cow.id);
      }
    });
    this.cows = this.cows.filter((cow) => cow.isAlive);
  }

  sellCow(id) {
    let sold_cow = this.cows.find((cow) => cow.id === id);
    this.cows = this.cows.filter((cow) => cow.id !== id);
    this.sold_cows++;
    this.revenue += (this.sale_price * sold_cow.weight) / 100;
  }
}

export default OperationModel;
