import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

import theme from '@/assets/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
			<Analytics />
		</ChakraProvider>
	);
}
