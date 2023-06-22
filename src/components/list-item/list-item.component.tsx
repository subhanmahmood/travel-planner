import { Checkbox, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ListItemProps } from '@/pages';

const ListItem: React.FC<ListItemProps> = ({
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
					{quantity > 1 && ` x ${quantity}`}
				</Text>
			</label>
		</HStack>
	);
};

export default ListItem;
