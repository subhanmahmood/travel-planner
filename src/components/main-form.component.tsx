import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	VStack,
	Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Select as MultiSelect } from 'chakra-react-select';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { PropsWithChildren, useState } from 'react';
import { Option } from 'react-select';

import {
	getOptionsFromEnum,
	getStringFromOptions,
} from '@/helpers/get-options-from-enum';
import { IPackingListItem } from '@/lib/store/slices/packing-list/packing-list.slice';
import { IPromptData } from '@/lib/store/slices/prompt-data/prompt-data.slice';
import { useAppStore } from '@/lib/store/store';
import {
	Accommodation,
	Activities,
	ModesOfTransport,
} from '@/pages/api/generate';

const MainForm: React.FC = () => {
	const { setPromptData, setPackingList} = useAppStore(state => state);
	const initialValues: IPromptData = {
		accommodation: '',
		activities: '',
		bags: undefined,
		destination: '',
		lengthOfStay: '',
		timeOfYear: '',
		transport: '',
	};

	const handleSubmit = async (values: IPromptData, formikHelpers: FormikHelpers<IPromptData>) => {
		formikHelpers.setSubmitting(true);
		setPromptData(values);
		// const res = await axios.post('/api/generate', values);
		// console.log(res.data)
		formikHelpers.setSubmitting(false);

		// setPackingList(res.data);
	};

	return (
		<>
			<Text mt={'32px'} fontSize='2xl'>Travel Planner</Text>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				onSubmit={handleSubmit}
			>
				{({ values, handleChange, setFieldValue, isSubmitting }) => (
					<Form>
						<VStack spacing={'24px'}>
							<FormControl>
								<FormLabel htmlFor="destination">Destination</FormLabel>
								<Input
									type="text"
									name="destination"
									id="destination"
									value={values.destination}
									onChange={handleChange}
								/>
								<FormHelperText>Where are you going?</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="accommodation">Accommodation</FormLabel>
								<MultiSelect
									variant="outline"
									name="accommodation"
									options={getOptionsFromEnum(Accommodation)}
									onChange={(options: readonly Option[]) => {
										setFieldValue('accommodation', getStringFromOptions(options));
									}}
									isMulti
								/>
								<FormHelperText>Where will you be staying?</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="activities">Activities</FormLabel>
								<MultiSelect
									variant="outline"
									name="activities"
									options={getOptionsFromEnum(Activities)}
									onChange={(options: readonly Option[]) => {
										setFieldValue('activities', getStringFromOptions(options));
									}}
									isMulti
								/>
								<FormHelperText>What are you going to be doing?</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="bags">Number of bags</FormLabel>
								<Input
									type="number"
									name="bags"
									id="bags"
									value={values.bags}
									onChange={handleChange}
								/>
								<FormHelperText>How many bags will you be taking?</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="lengthOfStay">Length of stay</FormLabel>
								<Input
									type="text"
									name="lengthOfStay"
									id="lengthOfStay"
									value={values.lengthOfStay}
									onChange={handleChange}
								/>
								<FormHelperText>How long will you be staying for?</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="timeOfYear">Time of year</FormLabel>
								<Input
									type="text"
									name="timeOfYear"
									id="timeOfYear"
									value={values.timeOfYear}
									onChange={handleChange}
								/>
								<FormHelperText>
									What time of year will you be going? (month or season works)
								</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="transport">Transport</FormLabel>
								<MultiSelect
									variant="outline"
									name="transport"
									options={getOptionsFromEnum(ModesOfTransport)}
									onChange={(options: readonly Option[]) => {
										setFieldValue('transport', getStringFromOptions(options));
									}}
									isMulti
								/>
								<FormHelperText>How will you be travelling?</FormHelperText>
							</FormControl>
						</VStack>
						<Button mt={'24px'} mb={'32px'} w='full' isLoading={isSubmitting} variant={'solid'} type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default MainForm;
