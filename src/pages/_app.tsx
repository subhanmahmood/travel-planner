import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import '@/assets/styles/globals.css';

import theme from '@/assets/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
