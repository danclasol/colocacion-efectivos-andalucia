import { GOOGLE_API_KEY } from '../constants/API_KEY';

export const getCenterAddressDetails = async search => {
	let addressDetails;

	try {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${GOOGLE_API_KEY}`;

		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();

			const {
				address_components: address,
				geometry,
				formatted_address: formattedAddress,
			} = data.results[0];

			const street = getAddressField(address, 'route', 'short');
			const streetNumber = getAddressField(address, 'street_number', 'short');

			const province = getAddressField(
				address,
				'administrative_area_level_2',
				'long'
			);

			const postalCode = getAddressField(address, 'postal_code', 'short');
			const coordinates = geometry.location;

			addressDetails = {
				street,
				streetNumber,
				province,
				postalCode,
				formattedAddress,
				coordinates,
			};
		}

		return {
			addressDetails,
			error: !res.ok,
			aborted: false,
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			location: undefined,
			error,
			aborted: isAborted,
		};
	}
};

export const getCityAddressDetails = async search => {
	let addressDetails;

	try {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${GOOGLE_API_KEY}`;

		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();

			const { address_components: address, geometry } = data.results[0];

			const province = getAddressField(
				address,
				'administrative_area_level_2',
				'long'
			);

			const coordinates = geometry.location;

			addressDetails = {
				province,
				coordinates,
			};
		}

		return {
			addressDetails,
			error: !res.ok,
			aborted: false,
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			location: undefined,
			error,
			aborted: isAborted,
		};
	}
};

const getAddressField = (rawData, fieldName, lenght) => {
	const field = rawData.find(item => item.types.includes(fieldName));

	return lenght === 'long' ? field?.long_name : field?.short_name;
};
