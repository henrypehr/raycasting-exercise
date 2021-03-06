class Particle {
  //constructor creates particle and rays
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rays = [];
    this.heading = 0;
    this.fov = 180;
    this.acc = createVector(0,0);
    //create array of rays within FOV range
    for (let a = -this.fov; a < this.fov; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  // 
  movement() {
    // 
    particle.look(walls);
    move.set(0, 0);
    for (let ray of particle.rays) {
      if (ray.len) {
        let tmp = createVector(ray.dir.x * ray.len, ray.dir.y * ray.len)
        move.add(tmp);
      }
    }
    move.normalize();
    particle.acc.add(move.mult(particle_rxn));
    move.mult(particle_speed);
    strokeWeight(3);
    // show little directional line scaled for acceleration
    line(particle.pos.x, particle.pos.y, particle.pos.x + (10*particle.acc.x), particle.pos.y + (10*particle.acc.y));
    strokeWeight(1);
    // update and show movement
    particle.update(particle.pos.x + particle.acc.x + move.x, particle.pos.y + particle.acc.y + move.y);
    particle.show();

    // extra stuff for particle to make it stand out
    stroke(0, 0, 255);
    strokeWeight(6);
    point(particle.pos.x,particle.pos.y);
    strokeWeight(1);
  }

  // rotates particle and its FOV together
  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = -this.fov; a < this.fov; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }
  // adds the heading vector with magnitude amt to the position
  move(amt) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    this.pos.add(vel);
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  // loop thru rays and find collisions with environment
  look(walls) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = ray.u;
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        if (show_rays) {
          stroke(255, 30);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
        // easy squared distance formula
        ray.len = ((this.pos.x - closest.x) ** 2) + ((this.pos.y - closest.y) ** 2);
      }
    }
  }
  // show particle function
  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
