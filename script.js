import Player from './player.js';
import InputHandler from './input.js';
import { drawStatusText } from './utils.js';
/** @type {HTMLCanvasElement} */
window.addEventListener('load', () => {
	const loading = document.getElementById('loading');
	loading.style.display = 'none';
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const player = new Player(canvas.width, canvas.height);
	const input = new InputHandler();

	let lastTime = 0;
	const animate = (timestamp) => {
		const deltaTime = timestamp - lastTime;
		lastTime = timestamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		player.update(input.lastKey);
		player.draw(ctx, deltaTime);
		drawStatusText(ctx, input, player);
		requestAnimationFrame(animate);
		console.log(deltaTime);
	};
	animate(0);
});
