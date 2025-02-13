import { useEffect, useState } from 'react';
import { CENTER_TYPES } from '../../constants/center-types';
import { PROVINCES } from '../../constants/provinces';
import { getLocations } from '../../lib/locations';
import InputCheckbox from '../forms/InputCheckbox';
import InputSearch from '../forms/InputSearch';
import InputSelect from '../forms/InputSelect';

const CenterListFilters = () => {
	const [provinceSelected, setProvinceSelected] = useState();
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		loadLocations({ location: provinceSelected, setLocations });
	}, [provinceSelected]);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-4">
				<InputSearch />
				<InputSelect>
					<option value="">Filtrar por tipo de centro...</option>
					{CENTER_TYPES.map(item => {
						return (
							<option key={item.type} value={item.type}>
								{item.type}
							</option>
						);
					})}
				</InputSelect>
				<InputSelect setValue={setProvinceSelected}>
					<option value="">Filtrar por provincia...</option>
					{PROVINCES.map(item => {
						return (
							<option key={item.province} value={item.province}>
								{item.name}
							</option>
						);
					})}
				</InputSelect>
				<InputSelect>
					<option value="">Filtrar por localidad...</option>
					{locations.map(item => {
						return (
							<option key={item.id} value={item.name}>
								{item.name}
							</option>
						);
					})}
				</InputSelect>
			</div>
			<div className="flex gap-4">
				<InputCheckbox
					label="Mostrar centros marcados como 'No mostrar'"
					defaultChecked={true}
				/>
				<InputCheckbox
					label="Mostrar centros ya incluidos en 'Mi lista'"
					defaultChecked={true}
				/>
				<InputCheckbox
					label="Mostrar centros voluntarios"
					defaultChecked={true}
				/>
			</div>
		</div>
	);
};

const loadLocations = async ({ location, setLocations }) => {
	const { locations, error } = await getLocations({
		location,
	});

	if (error) setLocations([]);
	if (locations) setLocations(locations);
};

export default CenterListFilters;
