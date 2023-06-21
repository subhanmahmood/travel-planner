import { groupByProperty } from './group-by-property';

interface Person {
	name: string;
	age: number;
}
  
const people: Person[] = [
	{ name: 'John', age: 25 },
	{ name: 'Jane', age: 30 },
	{ name: 'Dave', age: 25 },
	{ name: 'Sarah', age: 30 },
	{ name: 'Emily', age: 25 },
];
  
const animals = [
	{ name: 'Dog', type: 'Mammal' },
	{ name: 'Cat', type: 'Mammal' },
	{ name: 'Crocodile', type: 'Reptile' },
	{ name: 'Elephant', type: 'Mammal' },
	{ name: 'Snake', type: 'Reptile' },
];
  
describe('groupByProperty', () => {
	it('should group objects by age property', () => {
		const groupedByAge = groupByProperty(people, 'age');
      
		expect(groupedByAge).toEqual({
			'25': [
				{ name: 'John', age: 25 },
				{ name: 'Dave', age: 25 },
				{ name: 'Emily', age: 25 },
			],
			'30': [
				{ name: 'Jane', age: 30 },
				{ name: 'Sarah', age: 30 },
			],
		});
	});
  
	it('should group objects by type property', () => {
		const groupedByType = groupByProperty(animals, 'type');
      
		expect(groupedByType).toEqual({
			'Mammal': [
				{ name: 'Dog', type: 'Mammal' },
				{ name: 'Cat', type: 'Mammal' },
				{ name: 'Elephant', type: 'Mammal' },
			],
			'Reptile': [
				{ name: 'Crocodile', type: 'Reptile' },
				{ name: 'Snake', type: 'Reptile' },
			],
		});
	});
  
	it('should return an empty object for an empty array', () => {
		const emptyArray: [] = [];
		const grouped = groupByProperty(emptyArray, 'property');
      
		expect(grouped).toEqual({});
	});
  
	it('should handle objects with missing properties', () => {
		const objectsWithMissingProps = [
			{ name: 'Object 1', property: 'A' },
			{ name: 'Object 2' },
			{ name: 'Object 3', property: 'B' },
		];
		const groupedByProperty = groupByProperty(objectsWithMissingProps, 'property');
      
		expect(groupedByProperty).toEqual({
			'A': [
				{ name: 'Object 1', property: 'A' },
			],
			'undefined': [
				{ name: 'Object 2' },
			],
			'B': [
				{ name: 'Object 3', property: 'B' },
			],
		});
	});
});