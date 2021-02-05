import Head from 'next/head';
import Nav from '../components/nav/nav';
import FairyLights from '../components/fairylights/FairyLights';

export default function Page() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<FairyLights />
		</>
	);
}
