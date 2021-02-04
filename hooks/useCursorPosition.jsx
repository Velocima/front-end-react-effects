import { useEffect, useState } from 'react';

function useCursorPosition() {
	const [cursorPosition, setCursorPosition] = useState([0, 0]);
	useEffect(() => {
		function updatePosition({ clientX, clientY }) {
			setCursorPosition([clientX, clientY]);
		}
		window.addEventListener('mousemove', updatePosition);
		return () => window.removeEventListener('mousemove', updatePosition);
	}, []);
	return cursorPosition;
}

export default useCursorPosition;
