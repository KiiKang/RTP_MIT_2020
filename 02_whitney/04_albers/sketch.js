
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 04 __ Anni Albers




var isLoop = 'True';
var amp;

function setup() {
  cnv = createCanvas(1200, 800);

}

function draw() {
  frameRate(200);
  background(30);
	noStroke();
  t = framecount*PI/200
  let A = width/2
  let B = height/2
  let a = 5
  let b = 4
  let delta = PI/4
  x = A*sin(a*t+delta)
  y = B*sin(b*t)
  ellipse(x,y,dia,dia);
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
