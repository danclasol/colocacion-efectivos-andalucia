import { getProvinceName } from '../../lib/province';

const KIND_CLASSNAME = {
	almeria: 'bg-red-200',
	cadiz: 'bg-orange-200',
	cordoba: 'bg-amber-200',
	granada: 'bg-lime-200',
	huelva: 'bg-green-200',
	malaga: 'bg-green-500',
	sevilla: 'bg-emerald-200',
};

const ProvinceType = ({ province }) => {
	return (
		<span
			className={`text-base font-medium text-black text-center rounded-md px-4 py-1 flex flex-col ${KIND_CLASSNAME[province]}`}>
			{getProvinceName(province)}
		</span>
	);
};

export default ProvinceType;
