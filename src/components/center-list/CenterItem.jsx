import CenterCode from './CenterCode';
import CenterType from './CenterType';

const CenterItem = ({ code, center, name, location, voluntary, halfShift }) => {
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
			<td className="px-6 py-4 text-center">
				<p className="text-slate-500">{location.name}</p>
			</td>
			<td className="px-6 py-4 text-center">
				<p className="text-slate-500">{location.province}</p>
			</td>
			<td className="px-6 py-4 text-center">
				<input type="checkbox" disabled checked={halfShift}></input>
			</td>
			<td className="px-6 py-4 text-center">
				<span>{voluntary && 'Voluntario'}</span>
			</td>
		</tr>
	);
};

export default CenterItem;
