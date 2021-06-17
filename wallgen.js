class wallgen {
  //pretty much just marching squares generated from noise, nothing fancy
  constructor(walls, time) {
    this.walls = walls;
    this.time = time;

    const cols = 1 + width / res;
    const rows = 1 + height / res;
    for (let i = 0; i < cols; i++) {
      let k = [];
      for (let j = 0; j < rows; j++) {
        k.push(0);
      }
      field.push(k);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // field[i][j] = Math.random();
        field[i][j] = noise(i*detail,j*detail+time,time);
      }
    }

    for (let i = 0; i < cols - 1; i++) {
      for (let j = 0; j < rows - 1; j++) {
        let x = i * res;
        let y = j * res;
        let a = createVector(x + res * 0.5, y);
        let b = createVector(x + res, y + res * 0.5);
        let c = createVector(x + res * 0.5, y + res);
        let d = createVector(x, y + res * 0.5);
        let state = getState(
          pass(field[i][j]),
          pass(field[i + 1][j]),
          pass(field[i + 1][j + 1]),
          pass(field[i][j + 1])
        );
        switch (state) {
          case 1:
            this.walls.push(new Boundary(c, d));
            break;
          case 2:
            this.walls.push(new Boundary(b, c));
            break;
          case 3:
            this.walls.push(new Boundary(b, d));
            break;
          case 4:
            this.walls.push(new Boundary(a, b));
            break;
          case 5:
            this.walls.push(new Boundary(a, d));
            this.walls.push(new Boundary(b, c));
            break;
          case 6:
            this.walls.push(new Boundary(a, c));
            break;
          case 7:
            this.walls.push(new Boundary(a, d));
            break;
          case 8:
            this.walls.push(new Boundary(a, d));
            break;
          case 9:
            this.walls.push(new Boundary(a, c));
            break;
          case 10:
            this.walls.push(new Boundary(a, b));
            this.walls.push(new Boundary(c, d));
            break;
          case 11:
            this.walls.push(new Boundary(a, b));
            break;
          case 12:
            this.walls.push(new Boundary(b, d));
            break;
          case 13:
            this.walls.push(new Boundary(b, c));
            break;
          case 14:
            this.walls.push(new Boundary(c, d));
            break;
        }
      }
    }
  }
}
