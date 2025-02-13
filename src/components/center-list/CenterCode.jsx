import { useState } from 'react';

const CenterCode = ({ code, selectedInitial }) => {
	const [selected, setSelected] = useState(selectedInitial);

	const handleClick = () => {
		setSelected(!selected);
	};

	const classStyle = selected
		? 'bg-green-200 border-2 border-green-400'
		: 'bg-gray-100 border-2 border-grey-200';

	return (
		<span
			onClick={handleClick}
			className={`text-base font-medium text-black text-center rounded-md p-1 flex flex-col ${classStyle}`}>
			{code}
		</span>
	);
};

export default CenterCode;
