import ImportCodesList from '../import-codes-list/ImportCodesList';

const ImportCodesListPage = () => {
	return (
		<section className="flex flex-col gap-2 m-10">
			<h1 className="text-center mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
				Importar Códigos
			</h1>
			<ImportCodesList />
		</section>
	);
};

export default ImportCodesListPage;
