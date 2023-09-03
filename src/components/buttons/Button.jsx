const Button = ({ icon: Icon, children, ...props }) => {
	return (
		<button
			{...props}
			className="flex gap-3 items-center text-white font-medium text-sm rounded-lg px-5 py-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-blue-300">
			{Icon && <Icon className="w-5 h-5" />}
			<span className="text-lg border-blue-500 border-opacity-100">
				{children}
			</span>
		</button>
	);
};

export default Button;
