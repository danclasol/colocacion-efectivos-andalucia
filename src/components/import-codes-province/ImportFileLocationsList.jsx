import ImportFileLocationsListItem from './ImportFileLocationsListItem';

const ImportFileLocationsList = ({ province, locations }) => {
	return (
		<section className="flex flex-col gap-5">
			{locations.length > 0 && (
				<div className="shadow-md sm:rounded-lg">
					<table className="overflow-hidden w-full">
						<thead className="text-gray-700 bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3">
									Codigo
								</th>
								<th className="px-6 py-3">Province</th>
								<th className="px-6 py-3 w-full">Nombre</th>
								<th className="px-6 py-3">Mapa</th>
								<th className="px-6 py-3">Acciones</th>
							</tr>
						</thead>
						<tbody className="overflow-y-auto">
							{locations.map(location => (
								<ImportFileLocationsListItem
									key={location.id}
									{...location}
									province={province}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
};

export default ImportFileLocationsList;
