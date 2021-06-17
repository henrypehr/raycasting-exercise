class Ray {
  constructor(pos, ang) {
    this.ang = ang;
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(ang);
    // this is maybe not needed
    this.u;
    this.len;
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  cast(wall) {
    // get all those variables we need for a line-line intersection formula using determinants
    // found here: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;
    //formula for finding intersection of two lines
    //denominator
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }
    // intersection is true if 0 >= t <= 1 and u > 0
    // u is also related to distance of ray so we could use that instead of calculating distance formula for every ray
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    this.u = u;
    if (t >= 0 && t <= 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
  // set direction of ray with angle
  setAngle(angle) {
    this.dir = p5.Vector.fromAngle(angle);
  }

}
