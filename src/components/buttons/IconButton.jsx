const IconButton = ({ icon: Icon, ...props }) => {
	return (
		<button {...props}>
			<Icon className="w-8 h-8 p-1 text-gray-500 hover:text-gray-100 hover:bg-gray-500 hover:rounded-full" />
		</button>
	);
};

export default IconButton;
