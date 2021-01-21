import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useViewPercent(elementRef, horizontal) {
	const [parallaxPosition, setParallaxPosition] = useState(0);
	const [width, height] = useWindowSize();

	useEffect(() => {
		const topPosition = elementRef.current.getBoundingClientRect().top;
		const bottomPosition = elementRef.current.getBoundingClientRect().bottom;
		const refWidthScale =
			(elementRef.current.getBoundingClientRect().right -
				elementRef.current.getBoundingClientRect().left) /
			width;
		const onScroll = () => {
			const scrollPosition = window.scrollY + height;
			const scrollPerc = Math.min(
				Math.max(
					((scrollPosition - topPosition) * 100) /
						(height + bottomPosition - topPosition),
					0
				),
				100
			);
			setParallaxPosition(
				horizontal
					? Math.floor(scrollPerc * (1 + refWidthScale) - refWidthScale * 100)
					: scrollPerc
			);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [height, width]);

	return parallaxPosition;
}
