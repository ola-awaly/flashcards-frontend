import { useState } from 'react';
import styles from './Header.module.scss';
import Menu from './components/Menu/Menu';

function Header() {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<>
			<header className={styles.header}>
				<span>
					<i
						className={`fa-solid fa-bars ${styles.bar}`}
						onClick={() => setShowMenu(!showMenu)}
					></i>
				</span>
				<span className={styles.logo}>Flash & Lache</span>
			</header>
			<Menu showMenu={showMenu} setShowMenu={setShowMenu} />
		</>
	);
}

export default Header;
