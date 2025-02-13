import { Link } from 'react-router-dom';

const LinkButton = ({ filled, icon: Icon, children, ...props }) => {
	return (
		<Link
			{...props}
			className="flex items-center gap-2 px-12 py-8 rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium">
			{Icon && <Icon className="w-20 h-12" />}
			{children}
		</Link>
	);
};

export default LinkButton;
