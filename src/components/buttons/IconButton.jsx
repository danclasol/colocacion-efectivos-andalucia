const IconButton = ({ icon: Icon, ...props }) => {
	return (
		<button {...props}>
			<Icon className="w-10 h-10 text-gray-500 hover:text-gray-300" />
		</button>
	);
};

export default IconButton;
