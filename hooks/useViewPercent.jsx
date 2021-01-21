import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useViewPercent(elementRef) {
	const [parallaxPosition, setParallaxPosition] = useState(0);
	const [width, height] = useWindowSize();

	useEffect(() => {
		const topPosition = elementRef.current.getBoundingClientRect().top;
		const bottomPosition = elementRef.current.getBoundingClientRect().bottom;
		const onScroll = () => {
			const scrollPosition = window.scrollY + height;
			setParallaxPosition(
				Math.min(
					Math.max(
						((scrollPosition - topPosition) * 100) /
							(height + bottomPosition - topPosition),
						0
					),
					100
				)
			);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [height, width]);

	return parallaxPosition;
}
