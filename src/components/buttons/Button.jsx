const Button = ({ icon: Icon, children, ...props }) => {
	return (
		<button
			{...props}
			className="flex items-center px-10 py-6 rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			{Icon && <Icon class="w-20 h-10" />}
			<span className="text-2xl border-blue-500 border-opacity-100">
				{children}
			</span>
		</button>
	);
};

export default Button;
