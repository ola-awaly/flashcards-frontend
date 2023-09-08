const API_URL = 'https://127.0.0.1:8000/api/cours';

export async function getAll() {
	const response = await fetch(API_URL, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) return response.json();
	else
		throw new Error('Erreur lors de la récupération de la liste de matières');
}

export async function getByUser(id) {
	const response = await fetch(API_URL + '?user.id=' + id, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
	if (response.ok) return response.json();
	else
		throw new Error('Erreur lors de la récupération de la liste de matières');
}

export async function createMatiere(nouvelleMatiere) {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(nouvelleMatiere),
	});
	if (response.ok) return response.json();
	else throw new Error('Erreur lors de la création de la matière');
}

export async function getMatiere(id) {
	const response = await fetch(API_URL + '/' + id, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
	if (response.ok) return response.json();
	else throw new Error('Erreur lors de la récupération de la  matière');
}

export async function modifierMatiere(id, matiere) {
	const response = await fetch(API_URL + '/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(matiere),
	});
	if (response.ok) return response.json();
	else throw new Error('Erreur lors de la modification de la matière');
}

export async function deleteMatiere(id) {
	const response = await fetch(API_URL + '/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
	if (response.ok) return true;
	else throw new Error('Erreur lors de la suppression de la  matière');
}
