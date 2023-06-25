import { StateCreator } from 'zustand';

export interface IPackingListItem {
	category: string;
	name: string;
	quantity: number;
	packed: boolean;
	required: boolean;
	reason: string;
}

export interface PackingListSlice {
	packingList?: IPackingListItem[];
	setPackingList: (packingList: IPackingListItem[]) => void;
	removePackingListItem: (item: IPackingListItem) => void;
}

export const createPackingListSlice: StateCreator<PackingListSlice> = (
	set,
	get,
) => ({
	packingList: undefined,
	setPackingList: (packingList) => set({ packingList }),
	removePackingListItem: (item) =>
		set({
			packingList: get().packingList?.filter(
				(listItem) => listItem.name !== item.name,
			),
		}),
});
