const API_URL = 'https://127.0.0.1:8000/api/flashcards';
export async function getFlashcardsParChapitre(id) {
	const response = await fetch(API_URL + '?chapitre.id=' + id, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}
