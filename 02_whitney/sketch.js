
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
  const boxwidth = 600;
	noStroke();

  let dia = 7;
  let n = 1500;
  v = 20*(cos(frameCount*PI/50)+1);
  scalex = (width-boxwidth)*(cos(frameCount*PI/79)+1)+boxwidth/2;
  scaley = boxwidth/2;
  for(i=0; i<n; i++){
    u = 2*PI*i/n;
    x = scalex*cos(u)+width/2;
    y = scaley*sin(u*v)+height/2;
    fill(frameCount%155+100,i%128+127,255-frameCount%155,100);
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
