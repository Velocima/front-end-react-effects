import Link from 'next/link';
import style from './nav.module.css';
import { useState } from 'react';

export default function Nav() {
	const pages = ['/', '/parallax', '/bars', '/canvas', '/fairylights'];

	const [isOpen, setIsOpen] = useState(true);
	const handleClick = () => {
		setIsOpen((prevState) => !prevState);
	};
	const navStyle = {
		opacity: isOpen ? 1 : 0,
	};
	return (
		<>
			<div className={style.button} onClick={handleClick}></div>
			<nav className={style.nav} style={navStyle}>
				<ul>
					{pages.map((page) => {
						return (
							<li key={page}>
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
