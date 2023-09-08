import { useState } from 'react';
import { PROVINCES } from '../../constants/provinces';
import InputFileText from '../forms/InputFileText';
import InputSelect from '../forms/InputSelect';

const ImportFile = () => {
	const [province, setProvince] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const handleImportFile = file => {
		setIsLoading(true);

		const reader = new FileReader();

		reader.addEventListener(
			'load',
			async () => {
				const data = reader.result;
				const { error } = await window.bridge.saveText(province, data);

				if (error) setError(error.message);

				setIsLoading(false);
			},
			false
		);

		if (file) {
			reader.readAsText(file);
		}
	};

	return (
		<section className="flex flex-col gap-5 items-center py-8 px-20 w-full">
			<h2 className="text-2xl font-bold">Importar Fichero</h2>

			<ul className="max-w-sm mx-auto space-y-2 text-gray-500 list-disc list-inside">
				<li>
					Los ficheros se pueden obtener exportandolos directamente desde la
					página de la Junta.
				</li>
				<li>Cargar un fichero por provincia.</li>
			</ul>
			<div className="w-full">
				<label className="font-semibold block mb-1">Provincia</label>
				<InputSelect setValue={setProvince} disabled={isLoading}>
					<option value="">Seleccionar provincia...</option>
					{PROVINCES.map(item => {
						return (
							<option key={item.province} value={item.province}>
								{item.name}
							</option>
						);
					})}
				</InputSelect>
			</div>
			<div>
				<InputFileText
					isLoading={isLoading}
					handleImportFile={handleImportFile}
					disabled={!province}>
					Cargar fichero
				</InputFileText>
				{error && <p className="text-red-400 max-w-sm">{error}</p>}
			</div>
		</section>
	);
};

export default ImportFile;
