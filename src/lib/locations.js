export const getLocations = async ({ province }) => {
	let locations;

	try {
		const res = await fetch(`/files/output/${province}_localidades.json`);

		if (res.ok) {
			locations = await res.json();
		}

		return {
			locations,
			error: !res.ok,
			aborted: false,
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			centers: undefined,
			error,
			aborted: isAborted,
		};
	}
};
