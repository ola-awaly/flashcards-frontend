import { getChapitresByMatiere } from '../apis/chapitres';
import { getMatiere } from '../apis/matieres';

export async function matiereLoader(matiereid) {
	let matiere = await getMatiere(matiereid);
	let chapitres = await getChapitresByMatiere(matiereid);

	return { matiere, chapitres };
}
