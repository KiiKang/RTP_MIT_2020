
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 06 __ Lillian Schwartz

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid_now;
let cols;
let rows;
let resolution = 10;
var isLoop = 'True';
var i_bound = [];
var j_bound = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = int(width / resolution);
  rows = int(height / resolution);

  grid_now = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid_now[i][j] = 0;
    }
  }
  for (let i = int(cols*0.1); i < cols*0.5; i++) {
    for (let j = int(rows*0.2); j < rows*0.7; j++) {
      grid_now[i][j] = 1;
      i_bound.push(i);
      j_bound.push(j);
    }
  }
}

function draw() {
  background(50);
  frameRate(2);
  noStroke();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid_now[i][j] == 1) {
        fill(255);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let grid_next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid_now[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid_now, i, j);

      if (state == 0 && neighbors < 6  && (i_bound.includes(i)) && (j_bound.includes(j))){
        grid_next[i][j] = 1;
      } else if (state == 1 && (neighbors < 3 || neighbors > 5)) {
        grid_next[i][j] = 0;
      } else {
        grid_next[i][j] = state;
      }
    }
  }
  grid_now = grid_next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
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

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
