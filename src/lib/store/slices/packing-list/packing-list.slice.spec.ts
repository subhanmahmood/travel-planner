import { act } from 'react-dom/test-utils';

import { useAppStore } from '../../store';

const mockData = [
	{
		category: 'Clothing',
		name: 'T-shirt',
		quantity: 5,
		packed: false,
		required: true,
		reason: 'Basic clothing item for daily wear.',
	},
	{
		category: 'Toiletries',
		name: 'Toothbrush',
		quantity: 1,
		packed: false,
		required: true,
		reason: 'Oral hygiene.',
	},
	{
		category: 'Technology',
		name: 'Laptop',
		quantity: 1,
		packed: false,
		required: false,
		reason: 'Optional, for work or entertainment purposes.',
	},
	{
		category: 'Medicine',
		name: 'Prescription medication',
		quantity: 1,
		packed: false,
		required: true,
		reason: 'Essential for maintaining personal health.',
	},
	{
		category: 'Miscellaneous',
		name: 'Passport',
		quantity: 1,
		packed: false,
		required: true,
		reason: 'Essential for international travel.',
	},
];

describe('PackingListSlice', () => {
	const initialStoreState = useAppStore.getState();

	beforeEach(() => {
		useAppStore.setState(initialStoreState, true);
	});

	it('should set the packing list correctly', () => {
		act(() => {
			useAppStore.getState().setPackingList(mockData);
		});

		expect(useAppStore.getState().packingList).toEqual(mockData);
	});

	it('should remove items correctly', () => {
		act(() => {
			useAppStore.getState().setPackingList(mockData);
			useAppStore.getState().removePackingListItem({
				category: 'Toiletries',
				name: 'Toothbrush',
				quantity: 1,
				packed: false,
				required: true,
				reason: 'Oral hygiene.',
			});
		});

		expect(useAppStore.getState().packingList).toEqual([
			{
				category: 'Clothing',
				name: 'T-shirt',
				quantity: 5,
				packed: false,
				required: true,
				reason: 'Basic clothing item for daily wear.',
			},
			{
				category: 'Technology',
				name: 'Laptop',
				quantity: 1,
				packed: false,
				required: false,
				reason: 'Optional, for work or entertainment purposes.',
			},
			{
				category: 'Medicine',
				name: 'Prescription medication',
				quantity: 1,
				packed: false,
				required: true,
				reason: 'Essential for maintaining personal health.',
			},
			{
				category: 'Miscellaneous',
				name: 'Passport',
				quantity: 1,
				packed: false,
				required: true,
				reason: 'Essential for international travel.',
			},
		]);
	});
});
