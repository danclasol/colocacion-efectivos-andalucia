import { useState } from 'react';
import ImportIcon from '../icons/ImportIcon';

const InputFile = ({ province, ...props }) => {
	const [loading, setLoading] = useState(false);

	const handleFileInput = ev => {
		if (loading) return;

		setLoading(true);

		const file = ev.target.files[0];
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			async () => {
				const data = reader.result;
				await window.bridge.saveText(province, data);

				setLoading(false);
			},
			false
		);

		if (file) {
			reader.readAsText(file);
		}
	};

	const classIcon = !loading
		? 'text-gray-500 hover:rounded-full hover:text-white hover:bg-slate-400 hover:overflow-visible'
		: 'text-white rounded-full bg-slate-300 overflow-visible cursor-progress';

	return (
		<label>
			<ImportIcon className={`w-12 h-12 p-3 ${classIcon}`} />
			<input
				type="file"
				{...props}
				className="hidden"
				onChange={handleFileInput}
				accept=".txt"
			/>
		</label>
	);
};

export default InputFile;
