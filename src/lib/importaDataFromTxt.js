import { writeFile, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { CENTER_TYPES } from '../constants/center-types';
import { ProvinceNotMatch } from '../errors/ProvinceNotMatch';
import { getCenterAddressDetails, getCityAddressDetails } from './geocoding';
import { getProvinceName } from './province';

const transformData = (rawData, province) => {
	const arrayFile = removeHeaders(rawData).split('\n');
	const formattedData = formatData(arrayFile, province);
	const mappedData = mapData(formattedData, province);
	const centers = removeDuplicates(mappedData);
	const locations = extractLocations(centers);

	return { centers, locations };
};

export const extractDataFromFile = async (province, rawData) => {
	try {
		// Transform data
		const { centers, locations } = transformData(rawData, province);

		// Centers File
		const errorCenters = await writeCentersFile(centers, province);

		if (errorCenters)
			return {
				result: { centers: [], locations: [] },
				success: false,
				error: true,
				isAborted: false,
			};

		// Locations File
		// const errorLocations = await writeLocationsFile(locations, province);

		// if (errorLocations)
		// 	return {
		// 		result: { centers, locations: [] },
		// 		success: false,
		// 		error: true,
		// 		isAborted: false,
		// 	};

		return {
			result: { centers, locations },
			success: true,
			error: false,
			isAborted: false,
		};
	} catch (err) {
		console.log(err);

		const errorProvince = err.name === 'ProvinceNotMatch';

		if (errorProvince)
			return {
				success: false,
				error: { code: 200, message: err.message },
				aborted: false,
			};

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
	let error;
	const dirnameSrc = dirname(fileURLToPath(import.meta.url));

	const pathCenters = join(
		dirnameSrc,
		'..',
		'..',
		`/files/output/${province}.json`
	);

	// Get Locations
	// const centersWithAddress = addCoordsToCenters();

	writeFileSync(pathCenters, JSON.stringify(data), err => {
		if (err) {
			console.error(err);
			error = err;

			return error;
		}
	});
};

const extractLocations = cemters => {
	const listLocalidades = cemters.map(item => {
		return { ...item.location };
	});

	const localidades = listLocalidades.reduce((total, current) => {
		if (!total.some(item => item.id === current.id)) {
			total.push(current);
		}

		return total;
	}, []);

	return localidades;
};

const writeLocationsFile = async (data, province) => {
	const dirnameSrc = dirname(fileURLToPath(import.meta.url));

	// Get Locations
	// const localidadesWithAddress = addCoordsToLocations(localidades);

	const pathLocations = join(
		dirnameSrc,
		'..',
		'..',
		`/files/output/${province}_localidades.json`
	);

	writeFile(pathLocations, JSON.stringify(data), err => {
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

const addCoordsToCenters = async (data, province) => {
	return await Promise.all(
		data.map(async item => {
			const { addressDetails } = await getCenterAddressDetails(
				`${item.center} ${item.name} ${item.location.name} ${province}`
			);

			if (!addressDetails?.province && !addressDetails?.street) {
				console.log('No se ha encontrado nada', {
					center: item,
					province,
					search: `${item.center} ${item.name} ${item.location.name} ${province}`,
				});
			} else {
				const check = getProvinceName(province) === addressDetails?.province;

				if (!check) {
					console.log(
						`El fichero contiene registros no pertenecen a ${getProvinceName(
							province
						)} (${item.code} ${addressDetails?.formattedAddress})`
					);

					throw new ProvinceNotMatch(
						`El fichero contiene registros no pertenecen a ${getProvinceName(
							province
						)} (${addressDetails?.formattedAddress})`
					);
				}
			}

			return {
				...item,
				location: { ...item.location, ...addressDetails },
			};
		})
	);
};

const addCoordsToLocations = async data => {
	await Promise.all(
		data.map(async item => {
			const details = await getCityAddressDetails(
				`${item.name} ${item?.province}`
			);

			return {
				...item,
				...details.addressDetails,
			};
		})
	);
};
