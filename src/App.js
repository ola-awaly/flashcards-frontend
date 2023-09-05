import { Suspense } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
function App() {
	return (
		<div className="all">
			<div className="d-flex flex-column flex-fill">
				<Header />
				<Suspense>
					<Outlet />
				</Suspense>
				<Footer />
			</div>
		</div>
	);
}

export default App;
