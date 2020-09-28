
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 02 __ John Whitney




var isLoop = 'True';

function setup() {
  cnv = createCanvas(1200, 800, WEBGL);
  background(20);
}

function draw() {
  frameRate(200);
  //background(255);
  const boxwidth = 1000;
  camera(boxwidth,boxwidth,boxwidth,0,0,0,-1,-1,1);
  noFill();
  strokeWeight(1);
  sphere(1);


	noStroke();
	noFill();
  let dia = 3;
  let n = 500;
  let scale = boxwidth;
  u = frameCount / 200;
  for(i=0; i<n; i++){
    v = i*PI/n;
    x = scale*(cos(4*u)/4 + sin(v)*cos(u));
    y = scale*(sin(4*u)/4 + sin(v)*sin(u));
    z = cos(v);
    fill(frameCount%255,i%255,255-frameCount%255,30);
    ellipse(x,y,dia,dia);
  }

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
