import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { login, logout } from '../../apis/security';
import { useLoaderData } from 'react-router';

function AuthProvider({ children }) {
	const currentUser = useLoaderData();
	console.log(currentUser);
	const [user, setUser] = useState(currentUser);
	const signin = async (credentials) => {
		console.log(credentials);
		const connectedUser = await login(credentials);
		setUser(connectedUser);
		console.log(connectedUser);
	};
	const signout = () => {
		logout();
		setUser(null);
	};
	return (
		<AuthContext.Provider value={{ user, signin, signout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
