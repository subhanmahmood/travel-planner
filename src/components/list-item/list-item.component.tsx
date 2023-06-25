import { Badge, Checkbox, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import { IPackingListItem } from '@/lib/store/slices/packing-list/packing-list.slice';

const ListItem: React.FC<IPackingListItem> = ({
	category,
	name,
	quantity,
	packed,
	required,
	reason,
}) => {
	const [isPacked, setIsPacked] = useState(packed);

	return (
		<HStack alignItems={'center'} px={'16px'} py={'8px'}>
			<Checkbox
				isChecked={isPacked}
				id={`packed-${name}`}
				onChange={(event) => setIsPacked(event.target.checked)}
			></Checkbox>
			<label htmlFor={`packed-${name}`}>
				<Text as={isPacked ? 's' : 'p'}>
					{name}
					{quantity > 1 && <Badge ml={'1'} variant='outline' colorScheme='blackAlpha'>{` x ${quantity}`}</Badge>}
				</Text>
			</label>
		</HStack>
	);
};

export default ListItem;
