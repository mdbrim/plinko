function Particle(x, y, r) {
	var options = {
		restitution: 0.5,
		friction: 0.5
	}
	this.body = Bodies.circle(x, y, r, options);
	this.r = r;
	World.add(world, this.body);
}

Particle.prototype.isOffScreen = function() {
	var x = this.body.position.x;
	return (x< -50 || x > width + 50); 
}

Particle.prototype.show = function(face) {
	fill(255,0,100,255);
	stroke(255);
	var pos = this.body.position;
	var angle = this.body.angle;
	push();
	translate(pos.x, pos.y);
	rotate(angle);
	ellipse(0, 0, this.r * 2);
	textSize(24);
	textAlign(CENTER,CENTER);
	fill(0);
	text(face,0,0);
	pop();
}