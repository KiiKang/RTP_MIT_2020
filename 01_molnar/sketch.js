
// Kii Kang
// MAS.S68 Recreating the Past
// Week 01 __ Vera Molnar, Hypertransformations

var isLoop = 'True';
var amp;

function setup() {
  cnv = createCanvas(800, 800);
}

function draw() {
  frameRate(20);
	background(255);
	noStroke();
	noFill();
  const cen = createVector(width/2,height/2);
  const dist = 20;

  //fluctuate amplitude
  vol = (sin(PI*frameCount/20)-1)/2;

  for (i = 15; i > 0 ; i--) {
    if(i % 2 == 0) {
      fill(77,56,125);
    } else {
      fill(58);
    }
    cen.x += random(-dist/2*vol,dist/2*vol);
    cen.y += random(-dist/2*vol,dist/2*vol);
    var corners = [createVector(i*dist, i*dist), createVector(-i*dist, i*dist), createVector(-i*dist, -i*dist), createVector(i*dist, -i*dist)];
    let randAngle = random(-PI/20*vol,PI/20*vol);
    for(j = 0; j < 4; j++){
      corners[j].rotate(randAngle);
    }
    for(j = 0; j < 4; j++){
      corners[j].add(cen);
    }
		beginShape();
    vibrate(corners[0],corners[1]);
    vibrate(corners[1],corners[2]);
    vibrate(corners[2],corners[3]);
    vibrate(corners[3],corners[0]);
    endShape();
  }
}

function vibrate(v1,v2) {
  let vecOut = [v1];
  let par = [];
  let vxOut = [];
  let vec = createVector(v2.x-v1.x,v2.y-v1.y);
  let vecNormal = createVector(v2.y-v1.y,v2.x-v1.x);
  vecNormal.normalize();
  //create random numbers of a random number
  for(j = 0; j< random(0,i); j++){
    par.push(random(0,1));
  }
  //sort random numbers
  par = sort(par);
  for(j = 0; j < par.length; j++){
    let amp = randomGaussian(0,vec.mag()/50*vol);
    let vecAdd = createVector(amp*vecNormal.x+par[j]*vec.x+v1.x,amp*vecNormal.y+par[j]*vec.y+v1.y);
    vecOut.push(vecAdd);
  }
  vecOut.push(v2);
  for (j = 0; j < vecOut.length; j++){
    vertex(vecOut[j].x,vecOut[j].y);
  }
}

//stop and resume when mouse clicked
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
