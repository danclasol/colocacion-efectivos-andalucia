import { useParams } from 'react-router-dom';
import { getProvinceName } from '../../lib/province';
import ImportFile from '../import-codes-province/ImportFile';

const ImportCodesProvincePage = () => {
	const { province } = useParams();

	return (
		<section className="flex flex-col gap-2 m-10">
			<h1 className="text-center mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
				{`Lista de códigos de ${getProvinceName(province)}`}
			</h1>
			<ImportFile province={province} />
		</section>
	);
};

export default ImportCodesProvincePage;
