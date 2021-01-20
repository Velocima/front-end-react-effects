import { useState, useEffect } from 'react';
import style from '../styles/typed.module.css';

export default function Typed({ prefix, words, suffix, textInsertion, isPaused }) {
	const [isTypingDirectionForward, setIsTypingDirectionForward] = useState(true);
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [typedWord, setTypedWord] = useState('');

	words.forEach((word, index) => {
		if (typeof word !== 'string')
			throw new Error(`Words Array contains non string operand ${word} at index ${index}`);
		if (word === '') throw new Error(`Words Array contains empty string at index ${index}`);
	});
	useEffect(() => {
		const handleChange = () => {
			if (isPaused) return;
			setIsTypingDirectionForward((prevState) => {
				if (typedWord.length === 1 && !prevState) return true;
				if (
					`${typedWord}${words[currentWordIndex][currentLetterIndex]}` ===
					words[currentWordIndex]
				)
					return false;
				return prevState;
			});
			setCurrentLetterIndex((prevState) => {
				if (typedWord === words[currentWordIndex]) return 0;
				if (!isTypingDirectionForward) {
					return prevState;
				}
				return prevState + 1;
			});
			setCurrentWordIndex((prevState) => {
				if (typedWord.length === 1 && !isTypingDirectionForward) {
					return prevState === words.length - 1 ? 0 : prevState + 1;
				}
				return prevState;
			});
			setTypedWord((prevState) => {
				if (isTypingDirectionForward) {
					return prevState.concat(words[currentWordIndex][currentLetterIndex]);
				} else {
					return prevState.slice(0, -1);
				}
			});
		};

		const intervalID = setTimeout(
			handleChange,
			typedWord.length == words[currentWordIndex].length
				? 1500
				: 100 + Math.floor(Math.random() * 50)
		);
		return () => clearTimeout(intervalID);
	}, [typedWord, isPaused]);

	return (
		<>
			<p className={style.typed}>
				{`${prefix || ''}${prefix ? ' ' : ''}${typedWord}${suffix ? ' ' : ''}${
					suffix || ''
				}`}
				<span style={{ display: textInsertion ? 'inline' : 'none' }}>|</span>
			</p>
		</>
	);
}
