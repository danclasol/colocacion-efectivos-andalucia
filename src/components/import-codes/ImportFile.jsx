import { useState } from 'react';
import { PROVINCES } from '../../constants/provinces';
import InputFileText from '../forms/InputFile';
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

				if (error) setError(error);

				setIsLoading(false);
			},
			false
		);

		if (file) {
			reader.readAsText(file);
		}
	};

	return (
		<section className="flex flex-col gap-8 items-center py-8 px-20 w-full">
			<h2 className="text-2xl font-bold">Importar Fichero</h2>
			{error && <p>{error}</p>}
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
			<InputFileText
				isLoading={isLoading}
				handleImportFile={handleImportFile}
				disabled={!province}>
				Cargar fichero
			</InputFileText>
		</section>
	);
};

export default ImportFile;
