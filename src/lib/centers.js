import { PROVINCES } from '../constants/provinces';

export const getCenters = async ({ location }) => {
	let centers;

	try {
		const res = await fetch(`/files/output/${location}.json`);

		if (res.ok) {
			centers = await res.json();
		}

		return {
			centers,
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

export const getAllCenters = async () => {
	try {
		const requests = PROVINCES.filter(
			item => item.province !== 'almeria' && item.province !== 'granada'
		).map(async item => await fetch(`/files/output/${item.province}.json`));

		const responses = await Promise.all(requests);

		const centersArray = await Promise.all(
			responses.map(async res => await res.json())
		);

		const centers = [].concat(...centersArray);

		return {
			centers,
			error: true,
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
