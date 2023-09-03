import ArrowDownIcon from '../icons/ArrowDownIcon';

const InputSelect = ({ name, label, setValue, ...props }) => {
	return (
		<div className="relative w-full">
			<select
				{...props}
				onChange={ev => setValue(ev.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pr-10 p-2.5 w-full appearance-none"
				name={name}></select>
			<div className="absolute inset-y-3 right-10 flex items-center pointer-events-none">
				<ArrowDownIcon className="absolute w-10 h-5 text-gray-500" />
			</div>
		</div>
	);
};
export default InputSelect;
