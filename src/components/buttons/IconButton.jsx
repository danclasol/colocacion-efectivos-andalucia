const KIND_CLASSNAME = {
	gray: {
		normal: 'text-gray-500 hover:text-gray-400',
		filled:
			'text-white bg-gray-600 hover:bg-gray-200 hover:text-gray-600 rounded-full',
	},
	red: {
		normal: 'text-gray-500 hover:text-red-400',
		filled:
			'text-white bg-red-600 hover:bg-red-200 hover:text-red-600 rounded-full',
	},
	green: {
		normal: 'text-gray-500 hover:text-green-400',
		filled:
			'text-white bg-green-600 hover:bg-green-200 hover:text-green-600 rounded-full',
	},
	orange: {
		normal: 'text-gray-500 hover:text-amber-400',
		filled:
			'text-white bg-amber-600 hover:bg-amber-200 hover:text-amber-600 rounded-full',
	},
	disabled: {
		normal: 'text-gray-500 hover:text-amber-400',
		filled:
			'text-white bg-amber-600 hover:bg-amber-200 hover:text-amber-600 rounded-full',
	},
};

const IconButton = ({ icon: Icon, color = 'gray', filled, ...props }) => {
	const kindClassNames = KIND_CLASSNAME[color];
	const classNameKey = filled ? 'filled' : 'normal';
	const kindClassName = kindClassNames[classNameKey];

	const sizeIcon = filled ? 'w-5 h-5' : 'w-6 h-6';

	return (
		<button
			className={`flex justify-center items-center w-8 h-8 ${kindClassName}`}
			{...props}>
			<Icon className={sizeIcon} />
		</button>
	);
};

export default IconButton;
