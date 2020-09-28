
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 02 __ John Whitney




var isLoop = 'True';
var amp;

function setup() {
  cnv = createCanvas(1200, 800);

}

function draw() {
  frameRate(200);
  background(30);
  const boxwidth = 300;
	noStroke();

  let dia = 8;
  let n = 500;
  let scale = boxwidth;
  v = frameCount/50;
  for(i=0; i<n; i++){
    u = 2*PI*i/n;
    x = scale*cos(u)+width/2;
    y = scale*sin(u*v)+height/2;
    fill(frameCount%255,i%255,255-frameCount%255,80);
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
