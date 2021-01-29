import Head from 'next/head';
import styles from '../styles/bars.module.css';
import Nav from '../components/nav';
import { useState } from 'react';

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<main className={styles.main}>
				<h1>Hello Bars</h1>
			</main>
		</>
	);
}
