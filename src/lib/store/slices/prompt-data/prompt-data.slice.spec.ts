import { act } from 'react-dom/test-utils';

import {
	IPromptData,
} from './prompt-data.slice';
import { useAppStore } from '../../store';

describe('PromptDataSlice', () => {

	const initialStoreState = useAppStore.getState();

	beforeEach(() => {
		useAppStore.setState(initialStoreState, true);
	});

	it('should set prompt data correctly', () => {
		const promptValues: IPromptData = {
			accommodation: 'Airbnb',
			activities: 'Hiking',
			bags: 3,
			destination: 'germany',
			lengthOfStay: '3 weeks',
			timeOfYear: 'January',
			transport: 'Train',
		};

		act(() => {
			useAppStore.getState().setPromptData(promptValues);
		});

		expect(useAppStore.getState().promptData).toEqual(promptValues);
	});
});
