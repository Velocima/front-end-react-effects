import Head from 'next/head';
import styles from '../styles/fairylights.module.css';
import Nav from '../components/nav/nav';
import { useEffect, useState, useRef } from 'react';
import useWindowSize from '../hooks/useWindowSize';

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
		opacity = 0;
		x = Math.floor(Math.random() * width);
		y = Math.floor(Math.random() * height);
		vOpacity = 0.0005 + Math.random() * 0.001;
		vx = Math.random() / 4 - 0.125;
		vy = Math.random() / 4 - 0.125;
		radius = 5 + Math.floor(Math.random() * 20);

		draw() {
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`;
			this.ctx.fill();
		}
		updatePosition(canvas) {
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
			if (this.opacity >= 0.5) {
				this.opacity = 0.5;
				this.vOpacity *= -1;
			}
			if (this.opacity <= 0) {
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
				this.radius = 5 + Math.floor(Math.random() * 20);
			}
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
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		let balls = createBalls(50, ctx);

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

		for (let ball of balls) {
			ball.draw();
		}
	}, [width, height]);
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<main className={styles.main}>
				<canvas width={width} height={height} ref={canvasRef}></canvas>
			</main>
		</>
	);
}
