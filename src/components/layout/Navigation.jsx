import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CenterListPage from '../pages/CenterListPage';
import HomePage from '../pages/HomePage';
import ImportCodesPage from '../pages/ImportCodesPage';
import MyListsPage from '../pages/MyListsPage';

const Navigation = () => (
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

export default Navigation;
