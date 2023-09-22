const API_URL = 'https://127.0.0.1:8000/api/chapitres';
export async function getChapitresByMatiere(id) {
	let headers = localStorage.getItem('token')
		? {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
		  }
		: {
				'Content-Type': 'application/json',
		  };
	const response = await fetch(API_URL + '?cours.id=' + id, {
		headers,
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}

export async function createChapitre(nouveauChapitre) {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(nouveauChapitre),
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}

export async function getChapitre(id) {
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

export async function modifierChapitre(id, chapitre) {
	const response = await fetch(API_URL + '/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(chapitre),
	});
	if (response.ok) return response.json();
	else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}

export async function deleteChapitre(id) {
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
		throw new Error(await err.message);
	}
}

export async function rechercheChapitres(mot) {
	const response = await fetch(API_URL + '?titre=' + mot, {
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
