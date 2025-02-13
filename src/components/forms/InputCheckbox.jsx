const InputCheckbox = ({ label, ...props }) => {
	return (
		<div className="flex items-center">
			<input
				{...props}
				id="checkbox"
				type="checkbox"
				className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
			/>
			<label
				htmlFor="checkbox"
				className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
				{label}
			</label>
		</div>
	);
};

export default InputCheckbox;
