import styles from './Menu.module.scss';

function Menu({ showMenu, setShowMenu }) {
	const closeMenu = () => {
		setShowMenu(false);
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
						<i class="fa-solid fa-plus"></i>Je crée mes propres
						Flash-cards
					</li>
					<li>
						<i class="fa-solid fa-magnifying-glass"></i>Je cherche des
						Flash-cards
					</li>
					<li>
						<i class="fa-solid fa-right-to-bracket"></i>Je me connecte
					</li>
					<li>
						<i class="fa-solid fa-user-plus"></i>Je crée un compte
					</li>
				</ul>
			</div>
		</>
	);
}

export default Menu;
