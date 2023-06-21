export type GroupedArray<T> = { [key: string]: T[] };

export const groupByProperty = <T>(array: T[], property: keyof T): GroupedArray<T> => {
	return array.reduce((acc, current) => {
		const key = String(current[property]);
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(current);
		return acc;
	}, {} as GroupedArray<T>);
};