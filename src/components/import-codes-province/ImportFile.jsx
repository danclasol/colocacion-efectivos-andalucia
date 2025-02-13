import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getCenters } from '../../lib/centers';
import { getLocations } from '../../lib/locations';
import Button from '../buttons/Button';
import InputFileText from '../forms/InputFileText';
import ImportFileCentersList from './ImportFileCentersList';
import ImportFileLocationsList from './ImportFileLocationsList';

const ImportFile = ({ province }) => {
	const [toggle, setToggle] = useState(0);
	const [centers, setCenters] = useState();
	const [locations, setLocations] = useState();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		loadData({ province, setCenters, setLocations, setIsLoading });
	}, []);

	console.log({ centers, locations });

	const handleImportFile = file => {
		setIsLoading(true);

		const reader = new FileReader();

		reader.addEventListener(
			'load',
			async () => {
				const data = reader.result;
				const { result, success, error } = await window.bridge.saveText(
					province,
					data
				);

				const { centers, locations } = result;

				if (error) setError(error.message);

				if (success) {
					// closeModal();
					toast.success(
						`Fichero cargado correctamente. ${centers.length} centros cargados. ${locations.length} localidades cargados. `
					);

					setCenters(centers);
				}

				setIsLoading(false);
			},
			false
		);

		if (file) {
			reader.readAsText(file);
		}
	};

	const activeTab =
		'text-white border-2 border-blue-700 rounded-lg bg-blue-700';
	const inactiveTab =
		'border-2 border-transparent rounded-lg hover:text-gray-600 hover:border-blue-300 bg-blue-100 cursor-pointer';

	return (
		<>
			<section className="flex flex-col gap-5 items-center py-8 px-20 w-full ">
				<ul className="mx-auto space-y-2 text-gray-500 list-disc list-inside">
					<li>
						Los ficheros se pueden obtener exportandolos directamente desde la
						página de la Junta.
					</li>
					<li>Cargar un fichero por provincia.</li>
				</ul>

				<div className="flex gap-3 w-full">
					<InputFileText
						isLoading={isLoading}
						handleImportFile={handleImportFile}
						disabled={!province}>
						Cargar fichero
					</InputFileText>
					{error && <p className="text-red-400 max-w-sm">{error}</p>}
					<Button>Guardar codigos</Button>
				</div>
				{isLoading && <p>Cargando...</p>}
				{!isLoading && (
					<div className="flex flex-col gap-2 w-full">
						<ul className="flex flex-wrap justify-center gap-2 font-medium text-gray-500">
							<li
								className={`inline-flex items-center justify-center px-24 py-4 ${
									toggle === 0 ? activeTab : inactiveTab
								}`}
								onClick={() => setToggle(0)}>
								Centros
							</li>
							<li
								onClick={() => setToggle(1)}
								className={`inline-flex items-center justify-center px-24 py-4 ${
									toggle === 1 ? activeTab : inactiveTab
								}`}>
								Localidades
							</li>
						</ul>

						<div>
							{toggle === 0 && (
								<ImportFileCentersList province={province} centers={centers} />
							)}
							{toggle === 1 && (
								<ImportFileLocationsList
									province={province}
									locations={locations}
								/>
							)}
						</div>
					</div>
				)}
			</section>
		</>
	);
};

const loadData = async ({
	province,
	setCenters,
	setLocations,
	setIsLoading,
}) => {
	const { centers } = await getCenters({
		province,
	});

	if (centers) {
		setCenters(centers);
	}

	const { locations } = await getLocations({
		province,
	});

	if (locations) {
		setLocations(locations);
		setIsLoading(false);
	}
};

export default ImportFile;
