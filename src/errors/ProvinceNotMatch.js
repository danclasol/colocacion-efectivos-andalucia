export class ProvinceNotMatch extends Error {
	constructor(message) {
		super(message);
		this.name = 'ProvinceNotMatch';
	}
}
