import useViewPercent from '../hooks/useViewPercent';
import { useRef } from 'react';
import Nav from '../components/nav/nav';
import style from '../styles/parallax.module.css';
import ScrollBar from '../components/scrollBar/scrollBar';

export default function Parallax() {
	const imageOneRef = useRef(null);
	const perc = useViewPercent(imageOneRef);
	const parallaxOneStyle = {
		backgroundPosition: `center ${perc}%`,
	};

	const sideScrollRef = useRef(null);
	const sidePerc = useViewPercent(sideScrollRef, true);
	const sideScrollStyle = { transform: `translateX(${sidePerc}vw)` };
	return (
		<>
			<Nav />
			<main>
				<div className={style.filler}>
					<h1>Scroll For Parallax</h1>
				</div>
				<div style={parallaxOneStyle} className={style.parallaxOne} ref={imageOneRef}></div>

				<div className={style.sideScroll}>
					<h2 style={sideScrollStyle} ref={sideScrollRef}>
						More Parallax
					</h2>
				</div>
				<div className={style.filler}></div>
			</main>
			<ScrollBar backgroundColor='#283149' barColor='#f73859' />
		</>
	);
}
