const API_URL = 'https://127.0.0.1:8000/api/users';

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