// I might have too many global variables
let walls = [];
let res = 20;
let field = [];
let x, y;
let particle;
let time = 0;
// the low-pass filter value for creating walls from the noise
let limit = 0.6;
let cols = 600/res;
let rows = 600/res;
// the scaling factor of the noise
let detail = 0.1;
// these two affect how the particle moves in the environment
let particle_rxn = 0.01;
let particle_speed = 20;
// show rays as lines, maybe make this a toggle button in browser?
let show_rays = false;



function setup() {
  createCanvas(600, 600);
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
// little function that moves particle to where you click. was for debugging, now a feature!
function mouseClicked() {
  x = mouseX;
  y = mouseY;
  particle = new Particle(x,y);
}

function draw() {
  background(0);
  // pass time as a parameter to wallgen because we need it for the perlin noise
  wallgenerator = new wallgen(walls, time);
  // make walls around the edges
  walls.push(new Boundary(createVector(0, 0), createVector(width, 0)));
  walls.push(new Boundary(createVector(width, 0), createVector(width, height)));
  walls.push(new Boundary(createVector(width, height), createVector(0, height)));
  walls.push(new Boundary(createVector(0, height), createVector(0, 0)));
  for (let wall of walls) {
    wall.show();
  }
  stroke(225);
  strokeWeight(1);
  if (particle) {
    move = createVector(0,0);
    // three big particle functions that make most things happen
    particle.look(walls);
    particle.movement();
    particle.show();
  }
  // increment time for noise
  time=time+0.001;
  walls = [];
}
