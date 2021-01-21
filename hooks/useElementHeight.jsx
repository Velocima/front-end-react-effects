import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useAnimationPlaystate(elementRef) {
	const [elementHeight, setElementHeight] = useState([0, 0, 0]);
	const [width, height] = useWindowSize();

	useEffect(() => {
		const topPosition = (element) => element.current.getBoundingClientRect().top;
		const elementTopPosition = topPosition(elementRef);
		const onScroll = () => {
			const scrollPosition = window.scrollY + height;
			setElementHeight([elementTopPosition, scrollPosition, height]);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [height, width]);
	return elementHeight;
}
