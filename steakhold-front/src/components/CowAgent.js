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
    this.location.x += (Math.random() - 0.5) * 10;
    this.location.y += (Math.random() - 0.5) * 10;
  }
}

export default CowAgent;
