import { getMatiere } from '../apis/matieres';

export async function matiereEditLoader(id) {
	let matiere = await getMatiere(id);
	return {
		mode: 'edit',
		matiere,
	};
}
