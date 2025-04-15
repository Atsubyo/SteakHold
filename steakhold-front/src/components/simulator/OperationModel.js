import CowAgent from "./CowAgent";

// need to add "initial weights" to each node
// need to add "ADG" to each feedlot node
// support root

class OperationModel {
  constructor(config) {
    const {
      initialWeight,
      daysInCowCalf,
      daysInStocker,
      daysInFeedlot,
      ADGDuringCowCalfPhase,
      ADGDuringStockerPhase,
      ADGDuringFeedlotPhase,
      deathLossWean,
      deathLoss, // same name for both stocker and feedlot
      calfSalePrice,
      stockerSalePrice,
      feederCattleSalePrice,
      culledBreedingStockSales,
      ...expenses
    } = config;

    this.network = false;

    // Determine the phase from which the model is constructed
    const isCowCalf = "daysInCowCalf" in config;
    const isStocker = "daysInStocker" in config;
    const isFeedlot = "daysInFeedlot" in config;

    this.cows = [];
    this.num_cows = 0;
    this.dead_cows = 0;
    this.sold_cows = 0;
    this.revenue = 0;

    // Sum all numeric expenses to estimate total expenses per cow
    this.expenses = Object.values(expenses)
      .filter((v) => typeof v === "number")
      .reduce((sum, val) => sum + val, 0);

    this.initial_weight = initialWeight; // Can be parameterized if needed

    this.growth_rate = isCowCalf
      ? ADGDuringCowCalfPhase
      : isStocker
      ? ADGDuringStockerPhase
      : isFeedlot
      ? ADGDuringFeedlotPhase
      : 2; // Default
    this.max_days = daysInCowCalf || daysInStocker || daysInFeedlot || 200;

    const raw_death_rate = deathLossWean ?? deathLoss ?? 0.02; // Default to 2% if undefined
    this.death_rate = 1 - Math.pow(1 - raw_death_rate, 1 / this.max_days);
    this.raw_death_rate = raw_death_rate;

    this.sale_price =
      calfSalePrice ?? stockerSalePrice ?? feederCattleSalePrice ?? 100;

    this.target_weight = this.initial_weight + this.max_days * this.growth_rate;
  }

  setDailyDeathRate(death_rate) {
    this.death_rate = 1 - Math.pow(1 - death_rate, 1 / this.max_days);
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
    const transferCows = [];
    const remainingCows = [];
    for (let i = 0; i < this.cows.length; i++) {
      const cow = this.cows[i];

      if (this.death_rate > Math.random()) {
        cow.die();
        this.dead_cows++;
        continue;
      }

      cow.grow(this.growth_rate);
      cow.move();

      if (this.network && cow.weight >= this.target_weight) {
        transferCows.push(cow);
      } else {
        remainingCows.push(cow);
      }
    }

    this.cows = remainingCows;
    return transferCows;
  }

  efficiency() {
    console.log(culledBreedingStockSales);
  }

  costPerMillionTon() {}

  sellCow(id) {
    for (let i = 0; i < this.cows.length; i++) {
      if (this.cows[i].id === id) {
        const sold_cow = this.cows[i];
        this.cows[i] = this.cows[this.cows.length - 1];
        this.cows.pop();
        this.sold_cows++;
        this.revenue += (this.sale_price * sold_cow.weight) / 100;
        return;
      }
    }
  }
}

export default OperationModel;
