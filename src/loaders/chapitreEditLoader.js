import { getChapitre } from '../apis/chapitres';

export async function chapitreEditLoader(id) {
	let chapitre = await getChapitre(id);
	return {
		mode: 'edit',
		chapitre,
	};
}
