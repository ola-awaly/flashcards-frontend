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

export async function createFlashcard(nouveauFlashcard) {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(nouveauFlashcard),
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}

export async function getFlashcard(id) {
	const response = await fetch(API_URL + '/' + id, {
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

export async function modifierFlashcard(id, flashcard) {
	const response = await fetch(API_URL + '/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(flashcard),
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}

export async function deleteFlashcard(id) {
	const response = await fetch(API_URL + '/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
	if (response.ok) return true;
	else {
		let err = await response.json();
		console.log(err);
		throw new Error('une erreur');
	}
}

export async function rechercheFlashcards(mot) {
	const response = await fetch(API_URL + '?avant=' + mot, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}
