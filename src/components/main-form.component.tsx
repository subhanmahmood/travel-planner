import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { Select as MultiSelect } from 'chakra-react-select';
import { Form, Formik } from 'formik';
import React, { PropsWithChildren, useState } from 'react';
import { Option } from 'react-select';

import { ListItemProps } from '../pages/index';

import {
	getOptionsFromEnum,
	getStringFromOptions,
} from '@/helpers/get-options-from-enum';
import {
	Accommodation,
	Activities,
	PromptValues,
	ModesOfTransport,
} from '@/pages/api/generate';

type MainFormProps = PropsWithChildren & {
	setList: (list: ListItemProps[]) => void;
};

const MainForm: React.FC<MainFormProps> = ({ setList }) => {
	const [isLoading, setIsLoading] = useState(false);
	const initialValues: PromptValues = {
		accommodation: '',
		activities: '',
		bags: undefined,
		destination: '',
		lengthOfStay: '',
		timeOfYear: '',
		transport: '',
	};

	const handleSubmit = async (values: PromptValues) => {
		setIsLoading(true);
		console.log(values);

		const res = await axios.post('/api/generate', values);
		// const res = mockResult;

		setList(res.data);
	};

	return (
		<>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				onSubmit={handleSubmit}
			>
				{({ values, handleChange, setFieldValue }) => (
					<Form>
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
						<Button isLoading={isLoading} variant={'solid'} type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default MainForm;
