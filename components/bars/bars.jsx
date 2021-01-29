import { useState, useEffect } from 'react';
import style from './bars.module.css';

export default function Bars({ paused }) {
	const [bars, setBars] = useState([]);

	return (
		<>
			{bars}
			<Bar />
		</>
	);
}

const Bar = () => {
	return <div className={style.bar}></div>;
};
