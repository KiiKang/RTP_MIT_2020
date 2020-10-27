
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 06 __ Lillian Schwartz

// Written based on Daniel Shiffman's Coding Train
// https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_013_ReactionDiffusion/P5/sketch.js

//for reference
//http://karlsims.com/rd.html


let grid_now;
let grid_next;

let bitmap;
let cols;
let rows;
let pixelSize = 1;

var isLoop = 'True';

var dA = 1;
var dB = 0.5;
var feed = 0.0367;
var kill = 0.0649;

var i_bound = [];
var j_bound = [];

function preload() {
  mask = loadImage("original_mask.png");
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function getColorAtindex(img, x, y) {
  let idx = 4 * (x + y * img.width);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setup() {
  createCanvas(356, 462, WEBGL);
  cols = floor(width / pixelSize);
  rows = floor(height / pixelSize);
  grid_now = [];
  grid_next = [];
  bitmap = make2DArray(cols,rows);
  mask.loadPixels();
  for (let i = 0; i < cols; i++) {
    grid_now[i] = [];
    grid_next[i] = [];
    for (let j = 0; j < rows; j++) {
      grid_now[i][j] = { a: 1, b: 0 };
      grid_next[i][j] = { a: 1, b: 0 };
      let clr = getColorAtindex(mask, i, j);
      bitmap[i][j] = red(clr);
    }
  }
}

function draw() {
  background(150);

  //compute next grid
  for (let i = 1; i < cols-1; i++) {
    for (let j = 1; j < rows-1; j++) {
      let a = grid_now[i][j].a;
      let b = grid_now[i][j].b;
      grid_next[i][j].a = a + (dA*laplaceA(i,j) - a*b*b + feed*(1-a));
      grid_next[i][j].b = b + (dB*laplaceB(i,j) + a*b*b - (kill+feed)*b);
      grid_next[i][j].a = constrain(grid_next[i][j].a, 0, 1);
      grid_next[i][j].b = constrain(grid_next[i][j].b, 0, 1);
    }
  }

  noStroke();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * pixelSize;
      let y = j * pixelSize;
      var a = grid_next[i][j].a;
      var b = grid_next[i][j].b;
      fill(floor((a - b) * 255));
      //fill(round(a - b) * 255); //for bitmap image
      rect(x - width/2, y - height/2, pixelSize, pixelSize);
    }
  }
  //supply B to outside of the boundary
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if(bitmap[i][j] <= 5){
        grid_now[i][j].b = 1;
        grid_next[i][j].b = 1;
      }
    }
  }
  swap();
}

function laplaceA(i,j){
  var sumA = 0;
  sumA += grid_now[i][j].a * (-1);
  sumA += grid_now[i+1][j].a * 0.2;
  sumA += grid_now[i-1][j].a * 0.2;
  sumA += grid_now[i][j+1].a * 0.2;
  sumA += grid_now[i][j-1].a * 0.2;
  sumA += grid_now[i+1][j+1].a * 0.05;
  sumA += grid_now[i+1][j+1].a * 0.05;
  sumA += grid_now[i-1][j+1].a * 0.05;
  sumA += grid_now[i-1][j-1].a * 0.05;
  return sumA;
}

function laplaceB(i,j){
  var sum = 0;
  sum += grid_next[i][j].b * (-1);
  sum += grid_next[i+1][j].b * 0.2;
  sum += grid_next[i-1][j].b * 0.2;
  sum += grid_next[i][j+1].b * 0.2;
  sum += grid_next[i][j-1].b * 0.2;
  sum += grid_next[i+1][j+1].b * 0.05;
  sum += grid_next[i+1][j+1].b * 0.05;
  sum += grid_next[i-1][j+1].b * 0.05;
  sum += grid_next[i-1][j-1].b * 0.05;
  return sum;
}

function swap() {
  var temp = grid_now;
  grid_now = grid_next;
  grid_next = temp;
}

//pause and resume when mouse clicked
function mouseClicked() {
  if(isLoop == 'True'){
    isLoop = 'False';
  } else {
    isLoop = 'True';
  }
  if(isLoop == 'True'){
    loop();
  } else {
    noLoop();
  }
}
