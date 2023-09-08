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
