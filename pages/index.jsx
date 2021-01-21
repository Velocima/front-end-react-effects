import Head from 'next/head';
import styles from '../styles/index.module.css';
import Typed from '../components/typed';
import ClickRipple from '../components/clickRipple';
import { useState } from 'react';
import Nav from '../components/nav';

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
			<Nav />
			<main className={styles.main}>
				<Typed
					prefix='Hello'
					words={['Max', 'World', 'Matt']}
					textInsertion={isTypedTextInsertion}
					isPaused={isTypedPaused}
				/>
				<button onClick={() => setIsTypedTextInsertion((prevState) => !prevState)}>
					{`Text insertion: ${isTypedTextInsertion ? 'Visible' : 'Hidden'}`}
				</button>
				<button onClick={() => setIsTypedPaused((prevState) => !prevState)}>
					{`Text playstate: ${!isTypedPaused ? 'Playing' : 'Paused'}`}
				</button>
				<button onClick={() => setIsClickRippleOffset((prevState) => !prevState)}>
					{`Ripple center: ${!isClickRippleOffset ? 'Center' : 'Off center'}`}
				</button>
				<ClickRipple offCenter={isClickRippleOffset} />
			</main>
		</>
	);
}
