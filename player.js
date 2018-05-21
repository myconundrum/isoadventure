
class Player extends GameObject {

	constructor() {

		super();

		this._dest 			= new Point(5,17);
		this._moveDist 		= 0;
		this._moveLastTime 	= 0;
		this._moveSpeed 	= 1000;

		this._head 	= new AnimatedGameObject("default head");
		this._feet 	= new AnimatedGameObject("default feet");
		this._chest = new AnimatedGameObject("default chest");
		this._hands = new AnimatedGameObject("default hands");
		this._legs 	= new AnimatedGameObject("default legs");

		this.direction = "north";
		this.playAnimation("stand",true);
		this.pos = this._dest.clone();
	}

	get dest() 		{return this._dest;}
	set dest(v)		{this._dest = v;}

	get moveDist() 		{return this._moveDist;}
	get moveLastTime() 	{return this._moveLastTime;}
	get moveSpeed()		{return this._moveSpeed;}

	set moveDist(v) 	{this._moveDist = v;}
	set moveLastTime(v) {this._moveLastTime = v;}
	set moveSpeed(v)	{this._moveSpeed = v;}

	get direction() 	{return this._direction;}

	set direction(v)    {
		this._direction = v;
		this._head.direction = v;
		this._feet.direction = v;
		this._chest.direction = v;
		this._legs.direction = v;
		this._hands.direction = v;
	}


	playAnimation(name,loop) {
		this._head.playAnimation(name,loop);
		this._feet.playAnimation(name,loop);
		this._chest.playAnimation(name,loop);
		this._legs.playAnimation(name,loop);
		this._hands.playAnimation(name,loop);
	}


	draw() {
		var p = this.pos.toScreen();

		gGraphics.drawTile(p.x,p.y,this._head.tile);
		gGraphics.drawTile(p.x,p.y,this._feet.tile);
		gGraphics.drawTile(p.x,p.y,this._chest.tile);
		gGraphics.drawTile(p.x,p.y,this._hands.tile);
		gGraphics.drawTile(p.x,p.y,this._legs.tile);
		
	}


	update() {

		if (this.dest.equal(this.pos)) {
			return;
		}
		else {

			var move = gTime.deltaTime / this._moveSpeed;
			var dx = this.dest.x - this.pos.x; 
			var dy = this.dest.y - this.pos.y; 

			// set animation direction.
			this.direction = getNamedDirection(dx,dy);

			
			if (dx > 0) {
				this.pos.x = Math.abs(dx) < move ? this.dest.x : (this.pos.x + move);
			} else if (dx < 0) {
				this.pos.x = Math.abs(dx) < move ? this.dest.x : (this.pos.x - move);
			}


			if (dy > 0) {
				this.pos.y = Math.abs(dy) < move ? this.dest.y : (this.pos.y + move);
			} else if (dy < 0) {
				this.pos.y = Math.abs(dy) < move ? this.dest.y : (this.pos.y - move);
			}

			if (this.dest.equal(this.pos)) {
				this.playAnimation("stand",true);

				// clear target if we were moving to a target.
				gInput.targetEnabled = false;
			}
		}
	}
}