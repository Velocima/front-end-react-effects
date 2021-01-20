import Link from 'next/link';
import style from '../styles/nav.module.css';

export default function Nav() {
	const pages = ['/', '/parallax'];
	return (
		<>
			<nav className={style.nav}>
				<ul>
					{pages.map((page) => {
						return (
							<li>
								<Link href={page}>
									<a>{page === '/' ? 'home' : page.slice(1)}</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}