import Head from 'next/head';
import styles from '../styles/canvas.module.css';
import Nav from '../components/nav';
import { useState } from 'react';

export default function Page() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<main className={styles.main}>
				<h1 style={{ zIndex: 100 }}>Hello Bars</h1>
			</main>
		</>
	);
}
