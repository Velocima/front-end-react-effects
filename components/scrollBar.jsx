import { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';

export default function scrollBar({ backgroundColor, barColor }) {
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const [width, height] = useWindowSize();
	useEffect(() => {
		const body = document.body,
			html = document.documentElement;
		const documentHeight =
			Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			) - height;
		const onScroll = () => {
			const scrollPosition = window.scrollY;
			setScrollPercentage((100 * scrollPosition) / documentHeight);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}, [height]);
	const backgroundStyle = {
		backgroundColor,
		height,
		width: '10px',
		position: 'fixed',
		right: 0,
		top: 0,
		zIndex: 200,
	};
	const barStyle = { backgroundColor: barColor, height: `${scrollPercentage}vh`, width: '10px' };

	return (
		<div style={backgroundStyle}>
			<div style={barStyle}></div>
		</div>
	);
}
