class Boundary {
  //constructor creates a line from two endpoints
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

}
