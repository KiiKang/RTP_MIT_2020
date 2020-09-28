
// Kii Kang __ MIT SA+P MS Design and Computation Group
// 2020 Fall __ MAS.S68 Recreating the Past
// Week 04 __ Anni Albers

let aSlider, bSlider, ptSlider;

function setup() {
  createCanvas(800, 1200);
  textSize(15);
  fill(1);
  aSlider = createSlider(1, 10, 5);
  aSlider.position(15, 15);
  bSlider = createSlider(1, 10, 4);
  bSlider.position(15, 35);
  ptSlider = createSlider(10, 100, 52);
  ptSlider.position(15, 55);
  ampSlider = createSlider(0, 200, 100);
  ampSlider.position(15, 75);
}

function draw() {
  const a = aSlider.value();
  const b = bSlider.value();
  const pointNo = ptSlider.value();
  const amp = ampSlider.value();
  background(80,80);
  frameRate(200);
  noFill();
  let dt = PI/pointNo;
  let dia = 10;
  let margin = 60;
  let A = width/2;
  let B = height/2;
  let delta = PI/4;
  for(j=0;j<4;j++){
    //white thick curve
    strokeWeight(30-8.5*j);
    stroke((-1)**j*100+155);

    beginShape();
    for(let i=0; i<=pointNo*2+1; i++){
      noiseSeed(i);
      let x = (A-margin)*sin(a*dt*i+delta) + A;
      let y = (B-margin)*sin(b*dt*i) + B;
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
      curveVertex(x,y);
    }
    curveVertex((A-margin)*sin(delta) + A, B);
    endShape();

  }
}
