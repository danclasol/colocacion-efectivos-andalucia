import CenterList from '../center-list/CenterList';

const CenterListPage = () => {
	return (
		<section className="flex flex-col gap-4 m-10">
			<h1 className="mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
				Lista de Códigos
			</h1>
			<CenterList />
		</section>
	);
};

export default CenterListPage;
