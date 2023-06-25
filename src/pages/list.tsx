import { Text, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import ListItem from '@/components/list-item/list-item.component';
import {
	GroupedArray,
	groupByProperty,
} from '@/helpers/group-by-property/group-by-property';
import { IPackingListItem } from '@/lib/store/slices/packing-list/packing-list.slice';
import { IPromptData } from '@/lib/store/slices/prompt-data/prompt-data.slice';
import { useAppStore } from '@/lib/store/store';

const TripInfo: React.FC<{ promptData: IPromptData }> = ({ promptData }) => {
	const { destination, timeOfYear, lengthOfStay } = promptData;

	return (
		<Text fontSize={'16px'} mb="20px">
			Here's what you're gonna need for your trip to <b>{destination}</b> in{' '}
			<b>{timeOfYear}</b> for <b>{lengthOfStay}</b>
		</Text>
	);
};

const ListPage = () => {
	const { packingList, promptData } = useAppStore((state) => state);

	const [groupedList, setGroupedList] = useState<
		GroupedArray<IPackingListItem>
	>({});

	useEffect(() => {
		if (packingList.length > 0) {
			setGroupedList(groupByProperty(packingList, 'category'));
		}
	}, [packingList]);

	return (
		<Box px="16px" pt="16px">
			<TripInfo promptData={promptData} />
			{packingList.length < 1 ? (
				<Box>Oops! Looks like there's no items in your list</Box>
			) : (
				Object.keys(groupedList).map((category, i) => {
					return (
						<Box key={i} mb='20px'>
							<Text
								fontSize={'12px'}
								fontWeight={'semibold'}
								color={'gray.500'}
								textTransform={'uppercase'}
								letterSpacing={'wide'}
								mb={'8px'}
							>
								{category}
							</Text>
							{groupedList[category].map((listItem, j) => {
								return <ListItem key={j} {...listItem} />;
							})}
						</Box>
					);
				})
			)}
		</Box>
	);
};

export default ListPage;
