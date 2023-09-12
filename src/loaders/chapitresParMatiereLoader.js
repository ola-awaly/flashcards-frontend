import { getChapitresByMatiere } from '../apis/chapitres';

export async function chapitreParMatiereLoader(matiereid) {
	let chapitres = await getChapitresByMatiere(matiereid);
	return { chapitres, matiereid };
}
