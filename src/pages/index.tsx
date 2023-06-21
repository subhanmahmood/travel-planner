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

export type ListItemProps = {
	category: string;
	name: string;
	quantity: number;
	packed: boolean;
	required: boolean;
	reason: string;
};

export default function Home() {
	const [list, setList] = useState<ListItemProps[]>([]);
	const [groupedList, setGroupedList] = useState<GroupedArray<ListItemProps>>(
		{},
	);

	useEffect(() => {
		if (list.length > 0) {
			setGroupedList(groupByProperty(list, 'category'));
		}
	}, list);

	return (
		<Container display={'flex'} flexDir={'column'} gap={'16px'}>
			{!list.length ? (
				<MainForm setList={setList} />
			) : (
				<>
					{
						Object.keys(groupedList).map((category) => {
							return <>
								<Text fontSize={'24px'} fontWeight={'semibold'}>{category}</Text>
								{groupedList[category].map((listItem, i) => {
									return <ListItem key={i} {...listItem} />;
								})}
							</>;
						})
					}
				</>
			)}
		</Container>
	);
}
