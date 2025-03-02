class CowAgent {
  constructor(id) {
    this.id = id;
    this.age = 0;
    this.health = 100;
    this.location = { x: Math.random() * 100, y: Math.random() * 100 }; // Random position
  }

  // Method to simulate aging
  ageCow() {
    this.age += 1;
    if (this.age > 5 && Math.random() < 0.5) {
      // 50% chance to get sick after age 5
      this.getSick();
    }
  }

  // Method for a cow getting sick
  getSick() {
    this.health -= 25; // Decrease health by 25
    if (Math.random() < 0.25) {
      // 25% chance to die
      this.die();
    }
  }

  // Method for a cow dying
  die() {
    this.health = 0;
    console.log(`Cow ${this.id} has died.`);
  }

  // Method to simulate movement
  move() {
    this.location.x += (Math.random() - 0.5) * 10; // Small random movement
    this.location.y += (Math.random() - 0.5) * 10;
  }
}

export default CowAgent;
