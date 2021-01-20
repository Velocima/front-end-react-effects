import { useState, useEffect } from 'react';
import style from '../styles/clickRipple.module.css';

export default function ClickRipple({ offCenter }) {
	const [ripples, setRipples] = useState([]);

	useEffect(() => {
		const addRipple = ({ clientX, clientY }) => {
			const ID = Math.floor(Math.random() * clientY * clientX);
			setRipples((prevState) => [
				...prevState,
				<Ripple pageX={clientX} pageY={clientY} key={ID} offCenter={offCenter} />,
			]);
			setTimeout(() => {
				setRipples((prevState) => prevState.filter((ripple) => ripple.key != ID));
			}, 2000);
		};
		window.addEventListener('click', addRipple);
		return () => {
			window.removeEventListener('click', addRipple);
		};
	}, [ripples]);
	return <>{ripples}</>;
}

function Ripple({ pageX, pageY, offCenter }) {
	return (
		<div
			className={style.ripple}
			style={{
				top: pageY,
				left: pageX,
				transform: offCenter
					? `translate(-${40 + Math.floor(Math.random() * 20)}%, -${
							40 + Math.floor(Math.random() * 20)
					  }%)`
					: 'translate(-50%, -50%)',
			}}
		></div>
	);
}
