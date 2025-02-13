import IconButton from '../buttons/IconButton';
import CenterCode from '../center-list/CenterCode';
import CenterType from '../center-list/CenterType';
import MapIcon from '../icons/MapIcon';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';

const ImportFileCentersListItem = ({
	code,
	center,
	name,
	location,
	voluntary,
	halfShift,
}) => {
	return (
		<tr className="bg-white border-b">
			<td className="px-6 py-4">
				<CenterCode code={code} />
			</td>
			<td className="px-6 py-4">
				<CenterType center={center} />
			</td>
			<td className="px-6 py-4">
				<h2 className="text-xl font-medium text-black">{name}</h2>
			</td>
			<td className="px-6 py-4 truncate">
				<p className="text-slate-500">{location.name}</p>
			</td>
			<td className="px-6 py-4 text-center">
				<input type="checkbox" disabled checked={halfShift}></input>
			</td>
			<td className="px-6 py-4 text-center">
				<span>{voluntary && 'Voluntario'}</span>
			</td>
			<td className="px-6 py-4 text-center">
				<IconButton icon={MapIcon} color="gray" />
			</td>
			<td className="flex items-center px-6 py-4">
				<IconButton icon={PencilIcon} color="gray" />
				<IconButton icon={TrashIcon} color="gray" />
			</td>
		</tr>
	);
};

export default ImportFileCentersListItem;
