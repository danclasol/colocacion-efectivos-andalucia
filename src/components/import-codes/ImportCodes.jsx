import { PROVINCES } from '../../constants/provinces';
import ImportCodesProvince from './ImportCodesProvince';

const ImportCodes = () => {
	return (
		<section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 mx-36">
			{PROVINCES.map(item => {
				return <ImportCodesProvince key={item.province} {...item} />;
			})}
		</section>
	);
};

export default ImportCodes;
