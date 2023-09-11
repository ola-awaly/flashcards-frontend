import { useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { login, logout } from '../../apis/security';
import { useLoaderData, useNavigate } from 'react-router';

function AuthProvider({ children }) {
	const currentUser = useLoaderData();
	const navigate = useNavigate();

	const [user, setUser] = useState(currentUser);
	const [expired, setExpired] = useState(currentUser === 'expired');
	const signin = async (credentials) => {
		const connectedUser = await login(credentials);
		setUser(connectedUser);
		setExpired(false);
	};
	const signout = () => {
		logout();
		setUser(null);
		setExpired(false);
	};
	useEffect(() => {
		if (currentUser === 'expired' || expired === true) navigate('/login');
	}, [currentUser, navigate, expired]);
	return (
		<AuthContext.Provider value={{ user, signin, signout, setExpired }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
