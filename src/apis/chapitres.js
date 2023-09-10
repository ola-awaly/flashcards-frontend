const API_URL = 'https://127.0.0.1:8000/api/chapitres';
export async function getChapitresByMatiere(id) {
	const response = await fetch(API_URL + '?cours.id=' + id, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
	if (response.ok) return response.json();
	else
		throw new Error(
			'Une erreur est survenue lors de la récupération des chapitres de la matière no.' +
				id
		);
}
