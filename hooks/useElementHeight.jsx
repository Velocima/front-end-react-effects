import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useAnimationPlaystate(elementRef) {
	const [elementHeight, setElementHeight] = useState(0);
	const [width, height] = useWindowSize();

	useEffect(() => {
		const topPosition = (element) => element.current.getBoundingClientRect().top;
		const bottomPosition = (element) => element.current.getBoundingClientRect().bottom;
		const elementTopPosition = topPosition(elementRef);
		const elementBottomPosition = topPosition(elementRef);
		const elementCenter = elementBottomPosition - elementTopPosition;
		setElementHeight(elementCenter / 2);
	}, [height, width]);
	return elementHeight;
}
