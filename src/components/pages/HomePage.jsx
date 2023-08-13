import Menu from '../menu/Menu';

const HomePage = () => {
	return (
		<div>
			<section className="flex flex-col gap-4 m-10">
				<h1 className="text-center mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
					Colocacion de Efectivos 2023
				</h1>
				<Menu />
			</section>
		</div>
	);
};

export default HomePage;
