import Head from 'next/head';
import styles from '../styles/canvas.module.css';
import Nav from '../components/nav';
import { useEffect, useState, useRef } from 'react';
import useWindowSize from '../hooks/useWindowSize';

export default function Page() {
	const [width, height] = useWindowSize();
	const [isPlaying, setIsPlaying] = useState(true);
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		let raf;
		const ball = {
			x: 100,
			y: 100,
			vx: 5,
			vy: 2,
			radius: 25,
			color: '#161d6f',
			draw: function () {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fillStyle = this.color;
				ctx.fill();
			},
		};

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ball.draw();
			if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
				ball.vy = -ball.vy;
			}
			if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
				ball.vx = -ball.vx;
			}
			if (Math.abs(ball.vy) < 0.3 && canvas.height - ball.y < 30) {
				ball.vy = 25;
				if (Math.abs(ball.vx) < 0.1) {
					Math.random() < 0.5 ? (ball.vx += 10) : (ball.vx -= 10);
				}
			}

			ball.vy *= 0.99;
			ball.vy += 0.2;
			ball.vx *= 0.995;
			ball.x += ball.vx;
			ball.y += ball.vy;
			raf = window.requestAnimationFrame(draw);
		}

		raf = window.requestAnimationFrame(draw);

		ball.draw();

		const onClick = ({ clientX, clientY }) => {
			if (clientY > ball.y) {
				ball.vy -= 20;
			} else {
				ball.vy += 20;
			}
			if (clientX > ball.x) {
				ball.vx -= 10;
			} else {
				ball.vx += 10;
			}
			// Math.random() < 0.5 ? (ball.vx += 10) : (ball.vx -= 10);
		};
		window.addEventListener('click', onClick);
		return () => window.removeEventListener('click', onClick);
	}, [isPlaying]);
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<main className={styles.main}>
				<h1 style={{ zIndex: 100 }}>Hello Canvas</h1>
				<canvas width={width} height={height} ref={canvasRef}></canvas>
			</main>
		</>
	);
}
