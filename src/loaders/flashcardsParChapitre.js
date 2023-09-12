import { getFlashcardsParChapitre } from '../apis/flashcards';

export async function flashcardsParChapitreLoader(chapitreid, matiereid) {
	let flashcards = await getFlashcardsParChapitre(chapitreid);
	return { flashcards, matiereid };
}
