import { useState, useEffect } from 'react';
import styles from './bars.module.css';

export default function Bars({ paused }) {
	const [bars, setBars] = useState([]);

	const createBarStyle = (random) => {
		return {
			animationDuration: `${5 - random}s`,
			animationDelay: `${random}s`,
			height: `${15 + Math.floor(random * 50)}px`,
			right: `${150 * random - 50}vw`,
		};
	};

	useEffect(() => {
		const getBarID = () => Math.random() * Math.floor(Math.random() * 100 + 100);

		// Adds a bar to state then removes onAnimation finishing
		const addBar = () => {
			const barID = getBarID();
			const randomNumber = Math.random();

			setBars((prevState) => [
				...prevState,
				<Bar style={createBarStyle(randomNumber)} key={barID} />,
			]);
			setTimeout(() => {
				setBars((prevState) => prevState.filter((bar) => bar.key != barID));
			}, 5000 - randomNumber * 1000 + randomNumber * 950);
		};
		const timeoutID = setTimeout(() => {
			addBar();
			addBar();
			addBar();
		}, Math.floor(Math.random() * 1500) + 400);
		return () => clearTimeout(timeoutID);
	}, [bars]);

	return <>{bars}</>;
}

const Bar = ({ style }) => {
	return <div className={styles.bar} style={style}></div>;
};
