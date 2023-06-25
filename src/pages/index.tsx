import { Container } from '@chakra-ui/react';

import MainForm from '@/components/main-form.component';

export default function Home() {
	return (
		<Container display={'flex'} flexDir={'column'} gap={'16px'}>
			<MainForm />
		</Container>
	);
}
