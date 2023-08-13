import { Link } from 'react-router-dom';

const LinkButton = ({ filled, icon: Icon, children, ...props }) => {
	return (
		<Link
			{...props}
			className="flex items-center px-10 py-6 rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium">
			{Icon && <Icon className="w-20 h-10" />}
			<span className="text-2xl border-blue-500 border-opacity-100">
				{children}
			</span>
		</Link>
	);
};

export default LinkButton;
