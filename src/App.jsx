import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CenterListPage from './components/pages/CenterListPage';
import HomePage from './components/pages/HomePage';
import ImportCodesPage from './components/pages/ImportCodesPage';
import MyListsPage from './components/pages/MyListsPage';
import './styles/index.css';

const container = ReactDOM.createRoot(document.getElementById('root'));

container.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/listas" element={<MyListsPage />} />
			<Route path="/codigos" element={<CenterListPage />} />
			<Route path="/importar-codigos" element={<ImportCodesPage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</BrowserRouter>
);
