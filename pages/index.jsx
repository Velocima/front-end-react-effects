import Head from 'next/head';
import styles from '../styles/index.module.css';
import Typed from '../components/typed';
import Link from 'next/link';
import ClickRipple from '../components/clickRipple';
import { useState } from 'react';

export default function Home() {
	const [isClickRippleOffset, setIsClickRippleOffset] = useState(false);
	const [isTypedTextInsertion, setIsTypedTextInsertion] = useState(true);
	const [isTypedPaused, setIsTypedPaused] = useState(false);
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Typed
					prefix='Hello'
					words={['Max', 'World', 'Matt']}
					textInsertion={isTypedTextInsertion}
					isPaused={isTypedPaused}
				/>
				<button onClick={() => setIsTypedTextInsertion((prevState) => !prevState)}>
					toggle textInsertion
				</button>
				<button onClick={() => setIsTypedPaused((prevState) => !prevState)}>
					toggle typed playstate
				</button>
				<button onClick={() => setIsClickRippleOffset((prevState) => !prevState)}>
					toggle click ripple offset
				</button>
				<ClickRipple offCenter={isClickRippleOffset} />
			</main>
		</>
	);
}
