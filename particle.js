class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rays = [];
    this.heading = 0;
    this.fov = 180;
    this.acc = createVector(0,0);
    for (let a = -this.fov; a < this.fov; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  movement() {
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
    line(particle.pos.x, particle.pos.y, particle.pos.x + (10*particle.acc.x), particle.pos.y + (10*particle.acc.y));
    strokeWeight(1);
    particle.update(particle.pos.x + particle.acc.x + move.x, particle.pos.y + particle.acc.y + move.y);
    particle.show();


    stroke(0, 0, 255);
    strokeWeight(6);
    point(particle.pos.x,particle.pos.y);
    strokeWeight(1);
  }


  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = -this.fov; a < this.fov; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

  move(amt) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    this.pos.add(vel);
  }

  update(x, y) {
    this.pos.set(x, y);
  }


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
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        if (show_rays) {
          stroke(255, 30);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
        
        ray.len = ((this.pos.x - closest.x) ** 2) + ((this.pos.y - closest.y) ** 2);
      }
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}