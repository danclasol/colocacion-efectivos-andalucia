import { PROVINCES } from '../constants/provinces';

export const getProvinceName = province => {
	return PROVINCES.find(item => item.province === province)?.name;
};

export const getProvinceByName = name => {
	return PROVINCES.find(item => item.name === name)?.province;
};
