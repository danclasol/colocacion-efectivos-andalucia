import ImportIcon from '../icons/ImportIcon';
import LoadingSpinner from '../shared/LoadingSpinner';

const InputFileText = ({
	isLoading,
	disabled,
	handleImportFile,
	children,
	...props
}) => {
	const handleFileInput = ev => {
		const file = ev.target.files[0];

		handleImportFile(file);

		ev.target.value = '';
	};

	const inputStyle =
		!isLoading && !disabled ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400';

	return (
		<label
			className={`flex gap-3 items-center justify-center w-full text-white font-medium text-sm rounded-lg px-5 py-2.5 focus:ring-blue-300 ${inputStyle}`}>
			{!isLoading ? (
				<ImportIcon className={`w-5 h-5`} />
			) : (
				<LoadingSpinner className={`w-5 h-5`} />
			)}
			<input
				type="file"
				{...props}
				className="hidden"
				onChange={handleFileInput}
				accept=".txt"
			/>
			<span className="text-lg text-center border-blue-500 border-opacity-100">
				{!isLoading ? children : 'Cargando'}
			</span>
		</label>
	);
};

export default InputFileText;
