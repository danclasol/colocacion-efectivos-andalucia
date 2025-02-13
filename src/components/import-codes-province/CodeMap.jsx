import { getProvinceName } from '../../lib/province';
import CenterCode from '../center-list/CenterCode';

const CodeMap = ({ code, name, province, coords }) => {
	return (
		<div className="flex flex-col gap-6 items-center w-full px-20 py-10">
			<h3 className="text-center text-2xl font-medium">Mapa</h3>
			<div className="flex items-center gap-2">
				<CenterCode code={code} />
				<p className="text-center text-lg">{`${name} (${getProvinceName(
					province
				)})`}</p>
			</div>
		</div>
	);
};

export default CodeMap;
