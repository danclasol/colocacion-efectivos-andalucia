import CloseIcon from '../icons/CloseIcon';

const InputText = ({
	name,
	label,
	className,
	onClean,
	register,
	validate,
	error,
	...props
}) => {
	return (
		<label className="w-full">
			<span className="block">{label}</span>
			<input
				{...props}
				type="text"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pr-10 p-2.5 w-full appearance-none"
				name={name}
				{...register(name, validate)}
			/>
			<CloseIcon className="w-6 h-6 absolute" onClick={onClean} />
			{error && (
				<span
					className={`block w-full text-center text-red-400 font-medium text-md focus:ring-blue-300 `}>
					{error}
				</span>
			)}
		</label>
	);
};
export default InputText;
