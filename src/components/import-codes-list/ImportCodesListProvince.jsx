import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCenters } from '../../lib/centers';
import { getLocations } from '../../lib/locations';
import IconButton from '../buttons/IconButton';
import CheckIcon from '../icons/CheckIcon';
import CrossIcon from '../icons/CrossIcon';
import DotsIcon from '../icons/DotsIcon';

const ImportCodesListProvince = ({ province, name }) => {
	const navigate = useNavigate();

	const [centers, setCenters] = useState();
	const [locations, setLocations] = useState();

	const numberCenters = centers?.length || 0;
	const numberLocations = locations?.length || 0;

	const correctImport = numberCenters > 0 && numberLocations > 0;

	useEffect(() => {
		loadCenters({ province, setCenters });
		loadLocations({ province, setLocations });
	}, []);

	const getIcon = count => {
		if (count > 0) return <CheckIcon className={`w-4 h-4 text-green-400`} />;
		else return <CrossIcon className={`w-4 h-4 text-red-400`} />;
	};

	return (
		<Link
			className="flex justify-between items-center gap-4 px-10 py-6 rounded-lg text-gray-700 bg-gray-50 border-2 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
			to={`/importar-codigos/${province}`}>
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
			<div className="-m-6">
				<IconButton
					icon={DotsIcon}
					onClick={() => {
						navigate(`/importar-codigos/${province}`);
					}}
				/>
			</div>
		</Link>
	);
};

const loadCenters = async ({ province, setCenters }) => {
	const { centers } = await getCenters({
		province,
	});

	if (centers) {
		setCenters(centers);
	}
};

const loadLocations = async ({ province, setLocations }) => {
	const { locations } = await getLocations({
		province,
	});

	if (locations) {
		setLocations(locations);
	}
};

export default ImportCodesListProvince;
