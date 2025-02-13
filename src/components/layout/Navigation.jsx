Bimport { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BrowserView } from 'electron';
import CenterListPage from '../pages/CenterListPage';
import HomePage from '../pages/HomePage';
import ImportCodesListPage from '../pages/ImportCodesListPage';
import ImportCodesProvincePage from '../pages/ImportCodesProvincePage';
import MyListsPage from '../pages/MyListsPage';

const Navigation = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/listas" element={<MyListsPage />} />
			<Route path="/codigos" element={<CenterListPage />} />
			<Route path="/importar-codigos" element={<ImportCodesListPage />} />
			<Route
				path="/importar-codigos/:province"
				element={<ImportCodesProvincePage />}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</BrowserRouter>
);

export default Navigation;
