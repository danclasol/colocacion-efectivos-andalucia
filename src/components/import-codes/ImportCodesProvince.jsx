import { useEffect, useState } from 'react';
import { getCenters } from '../../lib/centers';
import { getLocations } from '../../lib/locations';
import InputFile from '../forms/InputFile';
import CheckIcon from '../icons/CheckIcon';
import CrossIcon from '../icons/CrossIcon';

const ImportCodesProvince = ({ province, name }) => {
	const [centers, setCenters] = useState();
	const [locations, setLocations] = useState();

	const numberCenters = centers?.length || 0;
	const numberLocations = locations?.length || 0;

	const correctImport = numberCenters > 0 && numberLocations > 0;

	useEffect(() => {
		loadCenters({ location: province, setCenters });
		loadLocations({ location: province, setLocations });
	}, []);

	const getIcon = count => {
		if (count > 0) return <CheckIcon className={`w-4 h-4 text-green-400`} />;
		else return <CrossIcon className={`w-4 h-4 text-red-400`} />;
	};

	return (
		<div className="flex justify-between items-center gap-4 px-10 py-6 rounded-lg text-gray-700 bg-gray-50 border-2 border-gray-100">
			<div className="flex flex-col gap-2 w-full">
				<div className="flex items-center gap-3">
					{correctImport && <CheckIcon className="w-6 h-6 text-green-400" />}
					{!correctImport && <CrossIcon className="w-6 h-6 text-red-400" />}
					<h3 className="text-2xl font-medium">{name}</h3>
				</div>
				<div className="flex flex-col gap-1 ml-8">
					<div className="flex items-center gap-2">
						{getIcon(numberCenters)}
						<span>{`Centros: ${numberCenters}`}</span>
					</div>
					<div className="flex items-center gap-2">
						{getIcon(numberLocations)}
						<span>{`Localidades: ${numberLocations}`}</span>
					</div>
				</div>
			</div>
			<div>
				<InputFile province={province} />
			</div>
		</div>
	);
};

const loadCenters = async ({ location, setCenters }) => {
	const { centers } = await getCenters({
		location,
	});

	if (centers) {
		setCenters(centers);
	}
};

const loadLocations = async ({ location, setLocations }) => {
	const { locations } = await getLocations({
		location,
	});

	if (locations) {
		setLocations(locations);
	}
};

export default ImportCodesProvince;
