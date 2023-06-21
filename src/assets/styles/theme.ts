import { extendTheme } from '@chakra-ui/react';
import { MultiSelectTheme } from 'chakra-multiselect';


const theme = extendTheme({
	fonts: {
		heading: "'Inter', sans-serif",
		body: "'Inter', sans-serif",
	},
	components: {
		MultiSelect: MultiSelectTheme,
	},
});

export default theme;
