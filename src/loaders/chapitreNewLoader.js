export function chapitreNewLoader(matiereid) {
	return {
		mode: 'new',
		chapitre: {
			titre: '',
			ordre: 0,
			status: 'private',
			cours: { id: matiereid },
		},
	};
}
