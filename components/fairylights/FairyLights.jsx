import styles from './fairylights.module.css';
import { useEffect, useRef } from 'react';
import useWindowSize from '../../hooks/useWindowSize';

export default function Page() {
	const [width, height] = useWindowSize();
	const canvasRef = useRef(null);

	class Ball {
		constructor(ctx) {
			this.color = {
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
			};
			this.ctx = ctx;
		}
		cursorX = 0;
		cursorY = 0;
		opacity = 0;
		opacityBuff = 0;
		x = Math.floor(Math.random() * width);
		y = Math.floor(Math.random() * height);
		vOpacity = 0.0005 + Math.random() * 0.001;
		vx = Math.random() / 4 - 0.125;
		vy = Math.random() / 4 - 0.125;
		radius = 10 + Math.floor(Math.random() * 15);
		isMouseInterations = true;
		playstate = true;
		dataStore = {
			cursorX: this.cursorX,
			cursorY: this.cursorY,
			opacity: this.opacity,
			opacityBuff: this.opacityBuff,
			x: this.x,
			y: this.y,
			vOpacity: this.vOpacity,
			vx: this.vx,
			vy: this.vy,
			radius: this.radius,
		};

		draw() {
			// Main ball
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${
				this.opacity + this.opacityBuff
			})`;
			this.ctx.fill();

			// inner glow
			this.ctx.beginPath();
			this.ctx.arc(
				this.x + Math.random() - 0.5 + (2 * this.x - width) / width,
				this.y + Math.random() - 0.5 + (2 * this.y - height) / height,
				this.radius + (25 - this.radius) / 5,
				0,
				Math.PI * 2,
				true
			);
			this.ctx.closePath();
			this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${
				0.2 * (this.opacity + this.opacityBuff)
			})`;
			this.ctx.fill();
			// outer glow
			this.ctx.beginPath();
			this.ctx.arc(
				this.x + Math.random() - 0.5 + (2 * this.x - width) / width,
				this.y + Math.random() - 0.5 + (2 * this.y - height) / height,
				this.radius + (25 - this.radius) / 4,
				0,
				Math.PI * 2,
				true
			);
			this.ctx.closePath();
			this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${
				0.1 * (this.opacity + this.opacityBuff)
			})`;
			this.ctx.fill();
		}
		updatePosition(canvas) {
			// gravitate ball towards cursor inside range of pxMin
			const pxMin = width < height ? width / 3 : height / 3;
			if (
				Math.abs(this.x - this.cursorX) < pxMin &&
				Math.abs(this.y - this.cursorY) < pxMin &&
				this.isMouseInterations &&
				this.playstate
			) {
				// vector direction
				const vxDir = this.x - this.cursorX > 1 ? -1 : 1;
				const vyDir = this.y - this.cursorY > 1 ? -1 : 1;
				// vector scale
				const vxD = 1 + Math.abs(this.x - this.cursorX) / pxMin;
				const vyD = 1 + Math.abs(this.y - this.cursorY) / pxMin;
				// vector force
				const force = -0.005 / (1 - Math.sqrt(vxD * vxD + vyD * vyD));
				// resultant velocity
				if (this.x > this.cursorX && this.vx > 0) {
					this.vx += vxDir * vxD * force * 2;
				} else {
					this.vx += vxDir * vxD * force;
				}
				if (this.y > this.cursorY && this.vy > 0) {
					this.vy += vyDir * vyD * force * 2;
				} else {
					this.vy += vyDir * vyD * force;
				}
			}
			// reverse velocity at canvas edge
			if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
				this.vy = -this.vy;
			}
			if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
				this.vx = -this.vx;
			}
			this.x += this.vx;
			this.y += this.vy;
		}
		updateColor() {
			this.opacity += this.vOpacity;
			// reverse opacity once peak is reached
			if (this.opacity >= 0.5) {
				this.opacity = 0.5;
				this.vOpacity *= -1;
			}
			// gen new ball once opacity reaches 0
			if (this.opacity <= 0) this.resetBall();

			// update opacityBuff for balls close to mouse
			if (!this.isMouseInterations || !this.playstate) return;
			const pxMin = width < height ? width / 4 : height / 4;

			if (
				Math.abs(this.x - this.cursorX) < pxMin &&
				Math.abs(this.y - this.cursorY) < pxMin
			) {
				const dx = Math.abs(this.x - this.cursorX);
				const dy = Math.abs(this.y - this.cursorY);
				const vo = this.opacity * 0.5 * (1 - Math.sqrt(dx * dx + dy * dy) / pxMin);
				this.opacityBuff = vo;
			} else {
				this.opacityBuff = 0;
			}
		}
		resetBall() {
			this.opacity = 0;
			this.vOpacity = 0.0005 + Math.random() * 0.001;
			this.color = {
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
			};
			this.vx = Math.random() / 4 - 0.125;
			this.vy = Math.random() / 4 - 0.125;
			this.x = Math.floor(Math.random() * width);
			this.y = Math.floor(Math.random() * height);
			this.radius = 10 + Math.floor(Math.random() * 15);
			this.opacityBuff = 0;
		}
		handleClick({ clientX, clientY }) {
			if (!this.playstate || !this.isMouseInterations) return;
			const pxMin = width < height ? width / 4 : height / 4;

			if (Math.abs(this.x - clientX) < pxMin && Math.abs(this.y - clientY) < pxMin) {
				// vector direction
				const vxDir = this.x - clientX > 1 ? -1 : 1;
				const vyDir = this.y - clientY > 1 ? -1 : 1;
				// vector scale
				const vxD = 1 + Math.abs(this.x - clientX) / pxMin;
				const vyD = 1 + Math.abs(this.y - clientY) / pxMin;
				// vector force
				const force = 1.5 / (1 - Math.sqrt(vxD * vxD + vyD * vyD));
				// resultant velocity
				this.vx = vxDir * vxD * force;
				this.vy = vyDir * vyD * force;
			}
		}
		updateCursor(mouseX, mouseY) {
			this.cursorX = mouseX;
			this.cursorY = mouseY;
		}
		storeCurrentData() {
			this.dataStore = {
				cursorX: this.cursorX,
				cursorY: this.cursorY,
				opacity: this.opacity,
				opacityBuff: this.opacityBuff,
				x: this.x,
				y: this.y,
				vOpacity: this.vOpacity,
				vx: this.vx,
				vy: this.vy,
				radius: this.radius,
			};
		}
		removeVelocity() {
			this.vOpacity = 0;
			this.vx = 0;
			this.vy = 0;
		}
		restoredata() {
			this.cursorX = this.dataStore.cursorX;
			this.cursorY = this.dataStore.cursorY;
			this.opacity = this.dataStore.opacity;
			this.opacityBuff = this.dataStore.opacityBuff;
			this.x = this.dataStore.x;
			this.y = this.dataStore.y;
			this.vOpacity = this.dataStore.vOpacity;
			this.vx = this.dataStore.vx;
			this.vy = this.dataStore.vy;
			this.radius = this.dataStore.radius;
		}
		togglePlaystate() {
			if (this.playstate) {
				this.playstate = false;
				this.storeCurrentData();
				this.removeVelocity();
			} else {
				this.playstate = true;
				this.restoredata();
			}
		}
		toggleMouseInteractions() {
			this.isMouseInterations = !this.isMouseInterations;
		}
	}

	const createBalls = (volume, ctx) => {
		let newBalls = [];
		for (let i = 0; i < volume; i++) {
			newBalls[i] = new Ball(ctx, width, height);
		}
		return newBalls;
	};

	useEffect(() => {
		// initalise canvas context
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		// create balls array
		const balls = createBalls(50, ctx);

		// create draw loop
		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let ball of balls) {
				ball.draw();
				ball.updateColor();
				ball.updatePosition(canvas);
			}
			window.requestAnimationFrame(draw);
		}
		window.requestAnimationFrame(draw);

		// event listeners
		const onClick = (e) => {
			for (let ball of balls) {
				ball.handleClick(e);
			}
		};
		const onMousemove = ({ clientX, clientY }) => {
			for (let ball of balls) {
				ball.updateCursor(clientX, clientY);
			}
		};
		const onKeypress = ({ key }) => {
			if (key === ' ') {
				for (let ball of balls) {
					ball.togglePlaystate();
				}
			}
			if (key === 'Enter') {
				for (let ball of balls) {
					ball.toggleMouseInteractions();
				}
			}
		};
		window.addEventListener('click', onClick);
		window.addEventListener('mousemove', onMousemove);
		window.addEventListener('keypress', onKeypress);
		return () => {
			window.removeEventListener('click', onClick);
			window.removeEventListener('mousemove', onMousemove);
			window.removeEventListener('keypress', onkeypress);
		};
	}, [width, height]);

	return (
		<div className={styles.main}>
			<canvas width={width} height={height} ref={canvasRef}></canvas>
		</div>
	);
}
