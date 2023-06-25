import { Badge, Checkbox, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import { IPackingListItem } from '@/lib/store/slices/packing-list/packing-list.slice';

const ListItem: React.FC<IPackingListItem> = ({ name, quantity, packed }) => {
	const [isPacked, setIsPacked] = useState(packed);

	return (
		<HStack alignItems={'center'} py={'8px'}>
			<Checkbox
				isChecked={isPacked}
				id={`packed-${name}`}
				onChange={(event) => setIsPacked(event.target.checked)}
			></Checkbox>
			<label htmlFor={`packed-${name}`}>
				<Text as={isPacked ? 's' : 'p'}>
					{name}
					{quantity > 1 && (
						<Badge
							ml={'1'}
							variant="outline"
							colorScheme="blackAlpha"
						>{` x ${quantity}`}</Badge>
					)}
				</Text>
			</label>
		</HStack>
	);
};

export default ListItem;
