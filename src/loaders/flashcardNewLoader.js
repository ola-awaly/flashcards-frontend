export function flashcardNewLoader(chapitreid) {
	console.log('dans new loader');
	return {
		mode: 'new',
		flashcard: {
			avant: '',
			arriere: '',
			ordre: 0,
			status: 'private',
			chapitre: { id: chapitreid },
		},
	};
}
