


class Player extends AnimatedGameObject {


	constructor(name) {

		super(name);

		this.loc = new Point(300,420);
		this.direction = "north";
		this.playAnimation("stand",true);

		this._destination = new Point(this.loc.x,this.loc.y);
	}

	get destination() 		{return this._destination;}
	set destination(v) 		{this._destination = v;}


	update() {
		if (this.destination.x  == this.loc.x && this.destination.y == this.loc.y ) {
			return;
		}
		else {
			var dx = this.destination.x - this.loc.x;
			var dy = this.destination.y - this.loc.y;
			
			this.direction = getNamedDirection(dx,dy);

			if (dx > 0) {
				this.loc.x++
			} else if (dx < 0) {
				this.loc.x--;
			}

			if (dy > 0) {
				this.loc.y++
			} else if (dy < 0) {
				this.loc.y--;
			}

			if (this.destination.x == this.loc.x && this.destination.y == this.loc.y) {
				this.playAnimation("stand",true);
			}

		}
	}
}