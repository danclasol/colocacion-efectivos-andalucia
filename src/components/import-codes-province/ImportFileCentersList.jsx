import ImportFileCentersListItem from './ImportFileCentersListItem';

const ImportFileCentersList = ({ centers }) => {
	return (
		<section className="flex flex-col gap-5">
			{centers.length > 0 && (
				<div className="shadow-md sm:rounded-lg">
					<table className=" overflow-hidden">
						<thead className="text-gray-700 bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3">
									Codigo
								</th>
								<th className="px-6 py-3">Centro</th>
								<th className="px-6 py-3 w-full">Nombre</th>
								<th className="px-6 py-3">Localidad</th>
								<th className="px-6 py-3 truncate">1/2 Jornada</th>
								<th className="px-6 py-3">Tipo</th>
								<th className="px-6 py-3">Mapa</th>
								<th className="px-6 py-3">Acciones</th>
							</tr>
						</thead>
						<tbody className="overflow-y-auto">
							{centers.map(center => (
								<ImportFileCentersListItem key={center.code} {...center} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
};

export default ImportFileCentersList;
