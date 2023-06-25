import { Option, getOptionsFromEnum, getStringFromOptions } from './get-options-from-enum';

describe('get options from enum', () => {
	it('should return [] for an empty input array', () => {
		expect(getOptionsFromEnum([])).toEqual([]);
	});

	it('should return correct values for an enum', () => {
		enum Test {
			One,
			Two,
			Three,
		}

		expect(getOptionsFromEnum(Test)).toEqual([
			{
				label: 'One',
				value: 0,
			},
			{
				label: 'Two',
				value: 1,
			},
			{
				label: 'Three',
				value: 2,
			},
		]);
	});
});

describe('get string from options', () => {
	it('should return an empty string if no options are passed', () => {
		expect(getStringFromOptions([])).toBe('');
	});

	it('should format options correctly', () => {
		const options: readonly Option[] = [
			{
				label: 'One',
				value: 0,
			},
			{
				label: 'Two',
				value: 1,
			},
		];

		expect(getStringFromOptions(options)).toBe('One, Two');
	});
});