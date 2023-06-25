import { StateCreator } from 'zustand';

import { Accommodation, Activities, ModesOfTransport } from '@/pages/api/generate';

export interface IPromptData {
	destination: string,
	transport?: ModesOfTransport | string,
	bags?: number,
	timeOfYear: string,
	lengthOfStay: string,
	activities?: Activities | string,
	accommodation?: Accommodation | string,
}

export interface PromptDataSlice {
	promptData: IPromptData,
	setPromptData: (promptData: IPromptData) => void;
}

export const createPromptDataSlice: StateCreator<PromptDataSlice> = (set) => ({
	promptData: { destination: '', timeOfYear: '', lengthOfStay: '' },
	setPromptData: (promptData) => set({ promptData }),
});