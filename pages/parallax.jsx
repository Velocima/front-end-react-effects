import useViewPercent from '../hooks/useViewPercent';
import { useRef } from 'react';
import Nav from '../components/nav';
import style from '../styles/parallax.module.css';
export default function Parallax() {
	const imageOneRef = useRef(null);
	const perc = useViewPercent(imageOneRef);
	const parallaxOneStyle = {
		backgroundPosition: `center ${perc}%`,
	};
	return (
		<>
			<Nav />
			<main>
				<div className={style.filler}>
					<h1>Scroll For Parallax</h1>
				</div>
				<div className={style.first}>
					<div></div>
					<div
						style={parallaxOneStyle}
						className={style.parallaxOne}
						ref={imageOneRef}
					></div>
				</div>

				<div className={style.filler}></div>
			</main>
		</>
	);
}
