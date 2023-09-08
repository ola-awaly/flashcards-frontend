import { useContext, useState } from 'react';
import styles from './Header.module.scss';
import Menu from './components/Menu/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
function Header() {
	const [showMenu, setShowMenu] = useState(false);
	const { user } = useContext(AuthContext);
	return (
		<>
			<header className={styles.header}>
				<span>
					<i
						className={`fa-solid fa-bars ${styles.bar}`}
						onClick={() => setShowMenu(!showMenu)}
					></i>
				</span>
				<span>
					<Link to="/" className={styles.logo}>
						Flash & Lache
					</Link>
				</span>
				{user && (
					<span className={styles.headerConnected}>
						<i className="fa-solid fa-circle-user"></i>
						{user.email}
					</span>
				)}
			</header>
			<Menu showMenu={showMenu} setShowMenu={setShowMenu} />
		</>
	);
}

export default Header;
