import { PROVINCES } from '../../constants/provinces';
import ImportCodesListProvince from './ImportCodesListProvince';

const ImportCodesList = () => {
	return (
		<>
			<section className="flex flex-col gap-4 mx-36">
				<div className="flex flex-col gap-4">
					<p className="text-center">
						Lista que muestra el número de códigos de centros y de localidades
						cargados actualmente en la aplicación.
					</p>

					<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
						{PROVINCES.map(item => {
							return <ImportCodesListProvince key={item.province} {...item} />;
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default ImportCodesList;
