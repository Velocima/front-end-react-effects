import Head from 'next/head';
import styles from '../styles/index.module.css';
import Typed from '../components/typed';

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<h1>Hello World</h1>

				<Typed prefix='Hello' words={['Max', 'World', 'Matt']} textInsertion />
			</main>
		</>
	);
}
