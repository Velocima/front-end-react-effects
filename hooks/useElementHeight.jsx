import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useAnimationPlaystate(elementRef) {
	const [elementHeight, setElementHeight] = useState([0, 0, 0]);
	const [width, height] = useWindowSize();

	useEffect(() => {
		const topPosition = elementRef.current.getBoundingClientRect().top;
		const bottomPosition = elementRef.current.getBoundingClientRect().bottom;
		const onScroll = () => {
			const scrollPosition = window.scrollY + height;
			setElementHeight([topPosition, scrollPosition, height + bottomPosition - topPosition]);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [height, width]);
	return elementHeight;
}
