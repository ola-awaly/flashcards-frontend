import { getChapitresByMatiere } from '../apis/chapitres';

export function chapitreParMatiereLoader(id) {
	return getChapitresByMatiere(id);
}
