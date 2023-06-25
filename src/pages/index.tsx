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
	const [list, setList] = useState<IPackingListItem[]>([]);
	const promptData = useAppStore(state => state.promptData);
	console.log(promptData);
	const [groupedList, setGroupedList] = useState<GroupedArray<IPackingListItem>>(
		{},
	);

	useEffect(() => {
		if (list.length > 0) {
			setGroupedList(groupByProperty(list, 'category'));
		}
	}, [list]);

	return (
		<Container display={'flex'} flexDir={'column'} gap={'16px'}>
			{!promptData  ? (
				<MainForm setList={setList} />
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
