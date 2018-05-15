


class Player extends AnimatedGameObject {


	constructor(name) {

		super(name);

		this.direction = "north";
		this.playAnimation("stand",true);


		this._dest 			= new Point(17,13);
		this._moveDist 		= 0;
		this._moveLastTime 	= 0;
		this._moveSpeed 	= 1000;

		this.pos.set(17,13);
	}

	get dest() 		{return this._dest;}
	set dest(v)		{this._dest = v;}

	get moveDist() 		{return this._moveDist;}
	get moveLastTime() 	{return this._moveLastTime;}
	get moveSpeed()		{return this._moveSpeed;}

	set moveDist(v) 	{this._moveDist = v;}
	set moveLastTime(v) {this._moveLastTime = v;}
	set moveSpeed(v)	{this._moveSpeed = v;}

	update() {

		if (this.dest.equal(this.pos)) {
			return;
		}
		else {

			var dx = this.dest.x - this.pos.x;
			var dy = this.dest.y - this.pos.y;

			var toMove = gTime.sinceLast / this._moveSpeed;
			this.direction = getNamedDirection(dx,dy);

			if (dx > 0) {
				this.pos.x = this.pos.x + toMove;
			} else if (dx < 0) {
				this.pos.x = this.pos.x - toMove;
			}

			if (dy > 0) {
				this.pos.y = this.pos.y + toMove;
			} else if (dy < 0) {
				this.pos.y = this.pos.y - toMove;
			}

			if (this.dest.equal(this.pos)) {
				this.playAnimation("stand",true);
			}

			this._moveLastTime = gTime.now;
		}
	}
}