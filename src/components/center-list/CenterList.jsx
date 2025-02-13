import { useEffect, useState } from 'react';
import { getAllCenters } from '../../lib/centers';
import CenterItem from './CenterItem';
import CenterListFilters from './CenterListFilters';

const CenterList = () => {
	const [centers, setCenters] = useState([]);

	useEffect(() => {
		loadCenters({ location: 'cadiz', setCenters });
	}, []);

	return (
		<section className="flex flex-col gap-5">
			<CenterListFilters />
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full">
					<thead className="text-gray-700 bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Codigo
							</th>
							<th className="px-6 py-3">Centro</th>
							<th className="px-6 py-3">Nombre</th>
							<th className="px-6 py-3">Localidad</th>
							<th className="px-6 py-3">Provincia</th>
							<th className="px-6 py-3">1/2 Jornada</th>
							<th className="px-6 py-3">Tipo</th>
						</tr>
					</thead>
					<tbody>
						{centers.map(center => (
							<CenterItem key={center.code} {...center} />
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

const loadCenters = async ({ location, setCenters }) => {
	const { centers } = await getAllCenters({
		location,
	});

	if (centers) setCenters(centers);
};

export default CenterList;
