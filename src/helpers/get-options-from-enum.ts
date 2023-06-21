import { Option } from 'react-select';

export const getOptionsFromEnum = (array: { [s: number]: string }): Option[] => {
	if (!array) {
		return [];
	}
    
	return Object.values(array).filter((value) => typeof value === 'string').map((value, i) => {
		return {
			label: value,
			value: i,
		};
	},
	);
};

export const getStringFromOptions = (options: readonly Option[]) => {
	if (!options) {
		return '';
	}

	return options.map(option => option.label).join(', ');
};