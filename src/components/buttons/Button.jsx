const KIND_CLASSNAME = {
	blue: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300',
	green:
		'text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-emerald-300',
	red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300',
};

const Button = ({ icon: Icon, kind = 'blue', children, ...props }) => {
	const colorButton = KIND_CLASSNAME[kind];

	return (
		<button
			{...props}
			className={`flex gap-3 items-center justify-center w-full font-medium text-sm rounded-lg px-5 py-2.5 ${colorButton}`}>
			{Icon && <Icon className="w-5 h-5" />}
			<span className="text-lg">{children}</span>
		</button>
	);
};

export default Button;
