import { getByUser } from '../apis/matieres';

export function gestionFlashcardsLoader(userid) {
	return getByUser(userid);
}
