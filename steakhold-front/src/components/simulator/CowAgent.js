class CowAgent {
  constructor(id, weight) {
    this.id = id;
    this.age = 0;
    this.isAlive = true;
    this.weight = weight;
    this.location = { x: Math.random() * 100, y: Math.random() * 100 };
  }

  grow(adg) {
    this.age++;
    this.weight += adg;
  }

  die() {
    this.isAlive = false;
    console.log(`Cow ${this.id} has died.`);
  }

  move() {
    this.location.x = Math.min(
			Math.max(this.location.x + (Math.random() - 0.5) * 10, 0),
			100
		);
		this.location.y = Math.min(
			Math.max(this.location.y + (Math.random() - 0.5) * 10, 0),
			100
		);
  }
}

export default CowAgent;
