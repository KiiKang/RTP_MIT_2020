
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 04 __ Anni Albers

let aSlider, bSlider, ptSlider;

function setup() {
  createCanvas(900, 1240, WEBGL);
  textSize(15);
  aSlider = createSlider(1, 20, 6);
  aSlider.position(15, 15);
  bSlider = createSlider(1, 20, 7);
  bSlider.position(15, 35);
  ptSlider = createSlider(10, 200, 127);
  ptSlider.position(15, 55);
  ampSlider = createSlider(0, 200, 120);
  ampSlider.position(15, 75);
}

function draw() {
  background(216,119,48);
  const a = aSlider.value();
  const b = bSlider.value();
  const pointNo = ptSlider.value();
  const amp = ampSlider.value();
  console.log(a,b,pointNo,amp)

  noFill();
  let dt = 2*PI/pointNo;
  let dia = 10;
  let margin = 100;
  let A = width/2;
  let B = height/2;
  let delta = PI/4;
  for(j=0;j<4;j++){
    stroke((-1)**j*100+140);
    if (j == 0){
      strokeW = 45;
    } else if (j == 1){
      strokeW = 34;
    } else if (j == 2){
      strokeW = 24;
    } else {
      strokeW = 5;
    }
    strokeWeight(strokeW);
    beginShape();
    for(let i=0; i<=pointNo+1; i++){
      noiseSeed(i);
      let x = (A-margin)*sin(a*dt*i+delta);
      let y = (B-margin)*sin(b*dt*i);
      let dx = a*cos(a*dt*i+delta);
      let dy = b*cos(b*dt*i);
      dx = dx / sqrt(dx*dx+dy*dy);
      dy = dy / sqrt(dx*dx+dy*dy);
      if (i % pointNo == 1 || i % pointNo == 0 ){
        noise_ = 0;
      } else {
        noise_ = amp*(-1)**i*noise(i/(pointNo*PI));
      }
      x = x + noise_*dy;
      y = y - noise_*dx;
      curveVertex(x,y,(-1)**i/100);
    }
    curveVertex((A-margin)*sin(delta) + A, B, 0);
    endShape();

  }
}
