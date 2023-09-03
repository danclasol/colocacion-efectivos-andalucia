const LoadingSpinner = ({ className }) => {
	return (
		<svg
			className={`animate-spin rounded-full border-2 border-r-transparent ${className}`}
			viewBox="0 0 24 24"></svg>
	);
};

export default LoadingSpinner;
