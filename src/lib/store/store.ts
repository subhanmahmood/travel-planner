import { create } from 'zustand';

import { PackingListSlice, createPackingListSlice } from './slices/packing-list/packing-list.slice';
import { PromptDataSlice, createPromptDataSlice } from './slices/prompt-data/prompt-data.slice';

type StoreState = PromptDataSlice & PackingListSlice;

export const useAppStore = create<StoreState>()((...a) => ({
	...createPromptDataSlice(...a),
	...createPackingListSlice(...a),
}));
