import CowAgent from "./CowAgent";

class OperationModel {
  constructor() {
    this.cows = [];
  }

  // Method to add a cow to the farm
  addCow() {
    const newCow = new CowAgent(this.cows.length + 1); // Cow ID is based on current size
    this.cows.push(newCow);
  }

  // Method to simulate one step in the model
  step() {
    this.cows.forEach((cow) => {
      cow.ageCow();
      cow.move();
    });

    // Optionally: remove dead cows
    this.cows = this.cows.filter((cow) => cow.health > 0);
  }

  // Method to simulate selling cows
  sellCow(id) {
    this.cows = this.cows.filter((cow) => cow.id !== id);
  }
}

export default OperationModel;
