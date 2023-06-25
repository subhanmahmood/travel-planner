import {
	Container,
	Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import ListItem from '@/components/list-item/list-item.component';
import MainForm from '@/components/main-form.component';
import {
	GroupedArray,
	groupByProperty,
} from '@/helpers/group-by-property/group-by-property';
import { IPackingListItem } from '@/lib/store/slices/packing-list/packing-list.slice';
import { useAppStore } from '@/lib/store/store';


export default function Home() {
	const { packingList } = useAppStore(state => state);
	const promptData = useAppStore(state => state.promptData);
	console.log(promptData);
	const [groupedList, setGroupedList] = useState<GroupedArray<IPackingListItem>>(
		{},
	);

	useEffect(() => {
		if (packingList.length > 0) {
			setGroupedList(groupByProperty(packingList, 'category'));
		}
	}, [packingList]);

	return (
		<Container display={'flex'} flexDir={'column'} gap={'16px'}>
			{!promptData  ? (
				<MainForm />
			) : (
				<>
					{
						Object.keys(groupedList).map((category, i) => {
							return <div key={i}>
								<Text fontSize={'24px'} fontWeight={'semibold'}>{category}</Text>
								{groupedList[category].map((listItem, j) => {
									return <ListItem key={j} {...listItem} />;
								})}
							</div>;
						})
					}
				</>
			)}
		</Container>
	);
}
