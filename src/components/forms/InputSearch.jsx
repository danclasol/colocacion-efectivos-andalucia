import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';

const InputSearch = ({ onCleanSearch, ...props }) => {
	return (
		<div className="relative w-full">
			<div className="absolute inset-y-3 left-0 flex items-center pointer-events-none">
				<SearchIcon className="w-10 h-5 text-gray-500" />
			</div>

			<input
				type="text"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-10 p-2.5 w-full"
				placeholder="Buscar centro..."
			/>
			<div className="absolute inset-y-3 right-10 flex items-center cursor-default">
				<CloseIcon
					className="absolute w-10 h-5 text-gray-500"
					onClick={onCleanSearch}
				/>
			</div>
		</div>
	);
};

export default InputSearch;
