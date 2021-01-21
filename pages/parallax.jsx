import useElementHeight from '../hooks/useElementHeight';
import { useRef } from 'react';
import Nav from '../components/nav';
import style from '../styles/parallax.module.css';
export default function Parallax() {
	const imageOneRef = useRef(null);
	const [imageOneHeight, scrollHeight, imageOneSize] = useElementHeight(imageOneRef);
	console.log(
		scrollHeight,
		imageOneHeight,
		imageOneSize,
		((scrollHeight - imageOneHeight) * 100) / imageOneSize
	);
	const parallaxOneStyle = {
		backgroundPosition: `center max(${Math.max(
			100 - ((scrollHeight - imageOneHeight) * 100) / imageOneSize,
			0
		)}%, 100%)`,
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
