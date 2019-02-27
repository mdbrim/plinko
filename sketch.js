var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;
var engine;
var world;
var particles = [];
var particle;
var pegs = [];
var bounds = [];
var cols = 13;
var rows = 10;
var font;
var inslot;
var slot = 0;
var blink = 0;
var scoreit = 0;
var maxturns = 5;
var turn = maxturns;
var score = 0;
var last = 0;
var best = 0;
var face = ":)";

function setup() {
  var canvas = createCanvas(600, 700);
  canvas.parent('sketch-holder');

  button = createButton('Play Again');
  button.parent('sketch-holder');
  button.position(515, 120);
  button.mousePressed(reset);
  button.hide();

  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 2;

  var spacing = width / cols;

  for (var j = -1; j < rows; j++) {
    for (var i = 2; i < cols - 2; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
        if(i == 2) x -= 3;
        if(i == cols - 3) x += 3;
      }
      var y = 2 * spacing + j * spacing
      var p = new Peg(x, y, 4);
      pegs.push(p);
    }
  }

  var b = new Boundary(width/2, height - 115, width-4*spacing+10, 10);
  bounds.push(b);
  for (var i = 2; i < cols-1; i++) {
    var x;
    var h;
    var w;
    
    if(i==2 || i == cols-2) {
    	h = height;
    	w = 10;
    	if(i == 2) x = i * spacing;
    	if(i == cols - 2) x = (i * spacing);
    }
    else {
    	x = i * spacing;
    	h = 32;
    	w = 10;
    }
    
    var y = height - 120 - h / 2;

    var b = new Boundary(x, y, w, h);
    bounds.push(b);
  }

}

function newParticle(x, y) {
  particle = new Particle(x, y, 16);
}

function mousePressed() {
  if(inslot && turn > 0 || turn == maxturns) {
	if(mouseX > 113 && mouseY > 0 && mouseX < width-113 && mouseY < 50) {
		blink = 0;
		slot = 0;
		inslot = false;
		scoreit = 0;
		if(particle) World.remove(world, particle.body);
    	newParticle(mouseX + random(-3, 3), 20);
    	turn -= 1;
    	face = ":)";
	}
  }
}

function reset() {
	World.remove(world, particle.body);
	particle = 0;
	inslot = false;
	scoreit = 0;
	button.hide();
	blink = 0;
	slot = 0;
	score = 0;
	turn = maxturns;
}

function draw() {
  background(238);
  fill(0);
  noStroke();
  rect(98,0,405,height-110);
  if(inslot && turn > 0 || turn == maxturns) {
  	fill(255,255,255,100);
  	rect(98,0,405,40);
  	textSize(24);
  	textAlign(CENTER, CENTER);
  	text("<----- DROP HERE ----->", 300, 20);
  }

  if(inslot && turn == 0) {
  	last = score;
  	button.show();
  }

  Engine.update(engine);

  if(particle) particle.show(face);

  for (var i = 0; i < pegs.length; i++) {
    pegs[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }

  if(particle && particle.body.position.y > height-136) inslot = true;

  if(particle && inslot) {
  	slot = floor(particle.body.position.x/45-1.5);
  	blink ++;
  	if(slot==1 && scoreit == 0) {
  		score += 100;
  		scoreit = 1;
  	}
  	if(slot==2 && scoreit == 0) {
  		score += 500;
  		scoreit = 1;
  	}
  	if(slot==3 && scoreit == 0) {
  		score += 1000;
  		scoreit = 1;
  	}
  	if(slot==4 && scoreit == 0) {
  		score += 0;
  		scoreit = 1;
  		face = ":(";
  	}
  	if(slot==5 && scoreit == 0) {
  		score += 10000;
  		scoreit = 1;
  		face = ":D";
  	}
  	if(slot==6 && scoreit == 0) {
  		score += 0;
  		scoreit = 1;
  		face = ":(";
  	}
  	if(slot==7 && scoreit == 0) {
  		score += 1000;
  		scoreit = 1;
  	}
  	if(slot==8 && scoreit == 0) {
  		score += 500;
  		scoreit = 1;
  	}
  	if(slot==9 && scoreit == 0) {
  		score += 100;
  		scoreit = 1;
  	}
  	if(score > best) best = score;
  }


  stroke(225,205,100);
  strokeWeight(5);

  fill(210,60,50,255);
  rect(96,height-107,41,100);

  fill(100,150,230,255);
  rect(142,height-107,41,100);

  fill(210,95,110,255);
  rect(188,height-107,41,100);

  fill(210,60,50,255);
  rect(234,height-107,41,100);

  fill(100,150,230,255);
  rect(280,height-107,41,100);

  fill(210,60,50,255);
  rect(326,height-107,41,100);

  fill(210,95,110,255);
  rect(372,height-107,41,100);

  fill(100,150,230,255);
  rect(418,height-107,41,100);

  fill(210,60,50,255);
  rect(464,height-107,41,100);

  strokeWeight(1);
  stroke(0);

  textAlign(CENTER, CENTER);

  textSize(28);

  fill(160,130,90);
  if(slot==1 && blink % 20 > 10) fill(255);
  text('1', 118, height-77);
  text('0', 118, height-55);
  text('0', 118, height-33);

  fill(160,130,90);
  if(slot==2 && blink % 20 > 10) fill(255);
  text('5', 164, height-77);
  text('0', 164, height-55);
  text('0', 164, height-33);
  
  fill(160,130,90);
  if(slot==3 && blink % 20 > 10) fill(255);
  text('1', 210, height-90);
  text('0', 210, height-66);
  text('0', 210, height-44);
  text('0', 210, height-22);
  
  fill(160,130,90);
  if(slot==4 && blink % 20 > 10) fill(255);
  text('0', 256, height-55);

  fill(160,130,90);
  if(slot==5 && blink % 20 > 10) fill(255);
  text('10', 300, height-90);
  text('0', 302, height-66);
  text('0', 302, height-44);
  text('0', 302, height-22);
  
  fill(160,130,90);
  if(slot==6 && blink % 20 > 10) fill(255);
  text('0', 348, height-55);
  
  fill(160,130,90);
  if(slot==7 && blink % 20 > 10) fill(255);
  text('1', 394, height-90);
  text('0', 394, height-66);
  text('0', 394, height-44);
  text('0', 394, height-22);
  
  fill(160,130,90);
  if(slot==8 && blink % 20 > 10) fill(255);
  text('5', 440, height-77);
  text('0', 440, height-55);
  text('0', 440, height-33);

  fill(160,130,90);
  if(slot==9 && blink % 20 > 10) fill(255);
  text('1', 486, height-77);
  text('0', 486, height-55);
  text('0', 486, height-33);

  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Discs left: ' + turn, 510, 50);
  text('Score: ' + score, 510, 70);
  text('Last: ' + last, 510, 85);
  text('Best: ' + best, 510, 100);

}
