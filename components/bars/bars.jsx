import styles from './bars.module.css';
import useWindowSize from '../../hooks/useWindowSize';

export default function Bars({ paused }) {
	const [width, height] = useWindowSize();

	const createBarStyle = (right) => {
		const random = Math.random();
		return {
			// animationPlaystate: paused ? 'paused' : 'playing',
			// animationDuration: `${10 - random * 3}s`,
			// animationDelay: `${random * 2}s`,
			height: `${width / 20}px`,
			right,
		};
	};
	const bars = [0].map((bar, i) => <Bar style={createBarStyle(bar)} key={i} />);

	return <>{bars}</>;
}

const Bar = ({ style }) => {
	const [width, height] = useWindowSize();
	return (
		<div className={styles.bar} style={style}>
			<div className={styles.innerBar} style={{ height: `${width / 20}px` }}></div>
		</div>
	);
};

// -1 * ((2 * width) / 6),
// width / 12,
// (2 * width) / 6,
// (3 * width) / 6,
// (4 * width) / 6,
// (5 * width) / 6,
// (6 * width) / 6,
