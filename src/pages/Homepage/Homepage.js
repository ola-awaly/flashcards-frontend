import img from '../../assets/images/accueil.png';
function Homepage() {
	return (
		<main className="flex-fill">
			<div className="texte">
				<span className="titre">
					Adieu longues listes ennuyeuses, fini les manuels interminables.
				</span>
				<span className="sous-titre">
					Des capsules de connaissance, portables, rapides,
					personnalisables, adaptées à chaque matière. Que vous étudiiez
					les mathématiques, la biologie, l'histoire, ou n'importe quelle
					autre matière, les flashcards vous offrent un moyen éprouvé
					d'accélérer votre apprentissage.
				</span>
				<div className="mt-15">
					<button className="btn btn-black">Crée tes flash-cards</button>
				</div>
			</div>
			<div className="image">
				<img src={img} alt="" />
			</div>
		</main>
	);
}
export default Homepage;
