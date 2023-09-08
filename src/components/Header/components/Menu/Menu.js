import { useContext } from 'react';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
function Menu({ showMenu, setShowMenu }) {
	const { user, signout } = useContext(AuthContext);
	const closeMenu = () => {
		setShowMenu(false);
	};
	const handleLogout = () => {
		closeMenu();
		signout();
	};
	return (
		<>
			{showMenu && <div className={styles.calc} onClick={closeMenu}></div>}
			<div
				className={
					showMenu
						? `${styles.menu}  ${styles.MenuOpen}`
						: `${styles.menu} ${styles.MenuClosed}`
				}
			>
				<ul>
					<li>
						<Link
							to={user ? `/myflashcards/${user.id}` : `/myflashcards/`}
							onClick={closeMenu}
						>
							<i className="fa-solid fa-plus"></i>Je crée mes propres
							Flash-cards
						</Link>
					</li>
					<li>
						<i className="fa-solid fa-magnifying-glass"></i>Je cherche des
						Flash-cards
					</li>
					{!user ? (
						<>
							<li>
								<Link to="/login" onClick={closeMenu}>
									<i className="fa-solid fa-right-to-bracket"></i>Je me
									connecte
								</Link>
							</li>
							<li>
								<Link to="/inscription" onClick={closeMenu}>
									<i className="fa-solid fa-user-plus"></i>Je crée un
									compte
								</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link onClick={handleLogout}>
									<i className="fa-solid fa-right-to-bracket"></i>Je me
									déconnecte
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</>
	);
}

export default Menu;
