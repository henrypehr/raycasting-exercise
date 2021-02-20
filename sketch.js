let walls = [];
let res = 20;
let field = [];
let x, y;
let particle;
let time = 0;
let limit = 0.6;
let cols = 600/res;
let rows = 600/res;
let detail = 0.1;
let particle_rxn = 0.01;
let particle_speed = 20;
let show_rays = false;



function setup() {
  createCanvas(600, 600);
  // make walls around the edges
}

function pass(x) {
  if (x < limit) {
    return 1;
  }
  return 0;
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

function mouseClicked() {
  x = mouseX;
  y = mouseY;
  particle = new Particle(x,y);
}

function draw() {
  background(0);
  wallgenerator = new wallgen(walls, time);
  walls.push(new Boundary(createVector(0, 0), createVector(width, 0)));
  walls.push(new Boundary(createVector(width, 0), createVector(width, height)));
  walls.push(new Boundary(createVector(width, height), createVector(0, height)));
  walls.push(new Boundary(createVector(0, height), createVector(0, 0)));
  for (let wall of walls) {
    wall.show();
  }
  stroke(225);
  // for (let x=0;x<30;x=x+0.5) {
  //   for (var y=0;y<30;y=y+0.5) {
  //       if (noise(x/detail,y/detail+time,time)>limit) {
  //         point(x*res,y*res);
  //         strokeWeight(noise(x/detail,y/detail+time,time)*10);
  //       }
  //   }
  // }
  strokeWeight(1);
  if (particle) {
    move = createVector(0,0);
    particle.look(walls);
    particle.movement();
    particle.show();
  }
  time=time+0.001;
  walls = [];
}