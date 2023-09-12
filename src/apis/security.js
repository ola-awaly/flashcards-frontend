const API_URL = 'https://127.0.0.1:8000/api/';

export async function createUser(newUser) {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
	});
	if (response.ok) return response.json();
	else throw Error("Error de création de l'utilisateur( email existe déjà ?)");
}

export async function login(credentials) {
	const response = await fetch(API_URL + 'login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	if (response.ok) {
		let body = await response.json();
		localStorage.setItem('token', body.token);
		return body.user;
	} else {
		let err = await response.json();
		throw new Error(await err.message);
	}
}

export function logout() {
	localStorage.removeItem('token');
}

export async function getCurrentUser() {
	let token = localStorage.getItem('token');
	if (token) {
		const response = await fetch(API_URL + 'users/current', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		if (response.ok) return response.json();
		else {
			logout();
			return 'expired';
		}
	} else return null;
}
