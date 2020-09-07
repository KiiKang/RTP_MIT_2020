
// Kii Kang
// MAS.S68 Recreating the Past
// Week 01 __ Vera Molnar

// ... changes evenly at every line, proceeding from left to right.
// Using an increasingly random process, the lines-built up
// with regular sequences going up and down with a tilt of
// 110-120 degrees-become more and more chaotic as they advance to the right


let mic;
var i;
var vol;

function setup() {
  createCanvas(900, 900);
background(255);
  // create an audio input
	//mic = new p5.AudioIn();
	// start the audio input
  //mic.start();
}

function draw() {
	stroke(0);
	background(255);
	strokeWeight(1);
	noFill();
  // Get the overall volume (between 0 and 1.0)
  //vol = mic.getLevel();
	//console.log(vol);
	vol = 3;
	var amp;
	var par;
	let dist = 30;
  var vertices;
	for (i = 1; i < 5; i++) {

		var corners = [createVector(width/2 + i*dist, height/2 + i*dist),
										createVector(width/2 - i*dist, height/2 + i*dist),
										createVector(width/2 - i*dist, height/2 - i*dist),
			  						createVector(width/2 + i*dist, height/2 - i*dist)];

		beginShape();
		//
		vertex(corners[0].x,corners[0].y);

		par = [];
		for(let j = 0; j < random(0,5*i); j++){
			par.push(random(-i*dist,i*dist));
		}
		par.sort();

		for(j = 0; j < par.length; j++){
			amp = randomGaussian(0,vol*i);
			vertex(width/2 + par[-j], height/2 + i*dist + amp);
		}
		//
		vertex(corners[1].x,corners[1].y);

		par = [];
		for(let j = 0; j < random(0,5*i); j++){
			par.push(random(-i*dist,i*dist));
		}
		par.sort();

		for(j = 0; j < par.length; j++){
			amp = randomGaussian(0,vol*i);
			vertex(width/2 - i*dist + amp, height/2 + par[-j]);
		}
		//
		vertex(corners[2].x,corners[2].y);

		par = [];
		for(let j = 0; j < random(0,i); j++){
			par.push(random(-i*dist,i*dist));
		}
		par.sort();
		par.reverse();
		for(j = 0; j < par.length; j++){
			amp = randomGaussian(0,vol*i);
			vertex(width/2  + par[j] , height/2 - i*dist + amp);
		}
		vertex(corners[3].x,corners[3].y);
		endShape();
	var dev = 15;
	}
	frameRate(10);
}
