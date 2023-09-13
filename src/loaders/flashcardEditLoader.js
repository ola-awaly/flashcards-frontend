import { getFlashcard } from '../apis/flashcards';

export async function flashcardEditLoader(id) {
	let flashcard = await getFlashcard(id);
	return {
		mode: 'edit',
		flashcard,
	};
}
