import { writeFile } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { CENTER_TYPES } from '../constants/center-types';
import { getCenterAddressDetails, getCityAddressDetails } from './geocoding';

export const extractDataFromFile = async (province, rawData) => {
	try {
		const arrayFile = removeHeaders(rawData).split('\n');
		const formattedData = formatData(arrayFile, province);
		const mappedData = mapData(formattedData, province);
		const data = removeDuplicates(mappedData);

		// Centers File
		writeCentersFile(data, province);

		// Locations File
		writeLocationsFile(data, province);

		return { success: true, error: false, isAborted: false };
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			success: false,
			error,
			aborted: isAborted,
		};
	}
};

const writeCentersFile = async (data, province) => {
	const dirnameSrc = dirname(fileURLToPath(import.meta.url));

	const pathCenters = join(
		dirnameSrc,
		'..',
		'..',
		`/files/output/${province}.json`
	);

	// Get Locations
	const centersWithAddress = await Promise.all(
		data.map(async center => {
			const details = await getCenterAddressDetails(
				`${center.name} ${center.location.name} ${province}`
			);

			return {
				...center,
				location: { ...center.location, ...details.addressDetails },
			};
		})
	);

	writeFile(pathCenters, JSON.stringify(centersWithAddress), err => {
		if (err) {
			console.error(err);
		}
	});
};

const writeLocationsFile = async (data, province) => {
	const dirnameSrc = dirname(fileURLToPath(import.meta.url));

	const listLocalidades = data.map(item => {
		return { ...item.location };
	});

	const localidades = listLocalidades.reduce((total, current) => {
		if (!total.some(item => item.id === current.id)) {
			total.push(current);
		}

		return total;
	}, []);

	// Get Locations
	const localidadesWithAddress = await Promise.all(
		localidades.map(async item => {
			const details = await getCityAddressDetails(
				`${item.name} ${item.province}`
			);

			return {
				...item,
				...details.addressDetails,
			};
		})
	);

	const pathLocations = join(
		dirnameSrc,
		'..',
		'..',
		`/files/output/${province}_localidades.json`
	);

	writeFile(pathLocations, JSON.stringify(localidadesWithAddress), err => {
		if (err) {
			console.error(err);
		}
	});
};

// Remove unnecessary text
const removeHeaders = text => {
	const result = text
		.replaceAll('\r', '')
		.replaceAll('N.\n', '')
		.replaceAll('Codigo\n', '')
		.replaceAll('Centro\n', '')
		.replaceAll('Localidad\n', '')
		.replaceAll('½Jorn.\n', '')
		.replaceAll('Tipo\n', '');

	return result;
};

// Transform rawData into array
const formatData = rawData => {
	return rawData.reduce((total, current) => {
		if (current.match(/[0-9]{8}[a-zA-Z]/g)) {
			total.push({ id: current, props: [] });
		} else {
			total[total.length - 1].props?.push(current);
		}

		return total;
	}, []);
};

// Map to Object with custom properties
const mapData = (data, province) => {
	const result = data.map(item => {
		const nameRaw = item.props[0];
		const centerType = CENTER_TYPES.find(item =>
			nameRaw.includes(item.type)
		)?.type;
		const centerName = nameRaw.replace(centerType, '').trim();
		const locationRaw = item.props[1];
		const locationName = locationRaw.slice(0, locationRaw.indexOf('(')).trim();
		const locationId = locationRaw
			.slice(locationRaw.indexOf('('))
			.replace(/[{()}]/g, '');

		return {
			code: item.id,
			center: centerType,
			name: centerName,
			location: {
				id: locationId,
				name: locationName,
				province,
			},
			halfShift: data.filter(i => i.id === item.id).length > 1,
			voluntary: item.props.some(item => item === 'Vol'),
		};
	});

	return result;
};

// Remove duplicated codes
const removeDuplicates = data => {
	const result = data.reduce((total, current) => {
		if (!total.some(item => item.code === current.code)) {
			total.push(current);
		}

		return total;
	}, []);

	return result;
};
