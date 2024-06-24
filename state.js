export const states = {
	STANDING_LEFT: 0,
	STANDING_RIGHT: 1,
	SITTING_LEFT: 2,
	SITTING_RIGHT: 3,
	RUNNING_LEFT: 4,
	RUNNING_RIGHT: 5,
	JUMPING_LEFT: 6,
	JUMPING_RIGHT: 7,
	FALLING_LEFT: 8,
	FALLING_RIGHT: 9,
};

class State {
	constructor(state) {
		this.state = state;
	}
}

export class StandingLeft extends State {
	constructor(player) {
		super('STANDING Left');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 6;
		this.player.frameY = 1;
		this.player.speed = 0;
	}
	handleInput(input) {
		if (input === 'PRESS Right') this.player.setState(states.STANDING_RIGHT);
		else if (input === 'PRESS Down') this.player.setState(states.SITTING_LEFT);
		else if (input === 'PRESS Left') this.player.setState(states.RUNNING_LEFT);
		else if (input === 'PRESS Up') this.player.setState(states.JUMPING_LEFT);
	}
}

export class StandingRight extends State {
	constructor(player) {
		super('STANDING Right');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 6;
		this.player.frameY = 0;
		this.player.speed = 0;
	}
	handleInput(input) {
		if (input === 'PRESS Left') this.player.setState(states.STANDING_LEFT);
		else if (input === 'PRESS Down') this.player.setState(states.SITTING_RIGHT);
		else if (input === 'PRESS Right')
			this.player.setState(states.RUNNING_RIGHT);
		else if (input === 'PRESS Up') this.player.setState(states.JUMPING_RIGHT);
	}
}

export class SittingLeft extends State {
	constructor(player) {
		super('SITTING Left');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 4;
		this.player.frameY = 9;
		this.player.speed = 0;
	}
	handleInput(input) {
		if (input === 'PRESS Right') this.player.setState(states.SITTING_RIGHT);
		else if (input === 'RELEASE Down')
			this.player.setState(states.STANDING_LEFT);
	}
}

export class SittingRight extends State {
	constructor(player) {
		super('SITTING Right');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 4;
		this.player.frameY = 8;
		this.player.speed = 0;
	}
	handleInput(input) {
		if (input === 'PRESS Left') this.player.setState(states.SITTING_LEFT);
		else if (input === 'RELEASE Down')
			this.player.setState(states.STANDING_RIGHT);
	}
}

export class RunningLeft extends State {
	constructor(player) {
		super('RUNNING Left');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 8;
		this.player.frameY = 7;
		this.player.speed = -this.player.maxSpeed;
	}
	handleInput(input) {
		if (input === 'PRESS Right') this.player.setState(states.RUNNING_RIGHT);
		else if (input === 'RELEASE Left')
			this.player.setState(states.STANDING_LEFT);
		else if (input === 'PRESS Down') this.player.setState(states.SITTING_LEFT);
	}
}

export class RunningRight extends State {
	constructor(player) {
		super('RUNNING Right');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 8;
		this.player.frameY = 6;
		this.player.speed = this.player.maxSpeed;
	}
	handleInput(input) {
		if (input === 'PRESS Left') this.player.setState(states.RUNNING_LEFT);
		else if (input === 'RELEASE Right')
			this.player.setState(states.STANDING_RIGHT);
		else if (input === 'PRESS Down') this.player.setState(states.SITTING_RIGHT);
	}
}

export class JumpingLeft extends State {
	constructor(player) {
		super('JUMPING Left');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 6;
		this.player.frameY = 3;
		if (this.player.onGround()) this.player.vy -= 30;
		this.player.speed = -this.player.maxSpeed * 0.5;
	}
	handleInput(input) {
		if (input === 'PRESS Right') this.player.setState(states.JUMPING_RIGHT);
		else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
		else if (this.player.vy > 0) {
			this.player.setState(states.FALLING_LEFT);
		}
	}
}

export class JumpingRight extends State {
	constructor(player) {
		super('JUMPING Right');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 6;
		this.player.frameY = 2;
		if (this.player.onGround()) this.player.vy -= 30;
		this.player.speed = this.player.maxSpeed * 0.5;
	}
	handleInput(input) {
		if (input === 'PRESS Left') this.player.setState(states.JUMPING_LEFT);
		else if (this.player.onGround())
			this.player.setState(states.STANDING_RIGHT);
		else if (this.player.vy > 0) {
			this.player.setState(states.FALLING_RIGHT);
		}
	}
}

export class FallingLeft extends State {
	constructor(player) {
		super('FALLING Left');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 6;
		this.player.frameY = 5;
	}
	handleInput(input) {
		if (input === 'PRESS Right') this.player.setState(states.FALLING_RIGHT);
		else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
	}
}

export class FallingRight extends State {
	constructor(player) {
		super('FALLING Right');
		this.player = player;
	}
	enter() {
		this.player.maxFrame = 6;
		this.player.frameY = 4;
	}
	handleInput(input) {
		if (input === 'PRESS Left') this.player.setState(states.FALLING_LEFT);
		else if (this.player.onGround())
			this.player.setState(states.STANDING_RIGHT);
	}
}
