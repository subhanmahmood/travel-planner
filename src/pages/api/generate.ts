// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type PromptValues = {
	destination: string,
	transport: string,
	bags: number,
	timeOfYear: string,
	lengthOfStay: string,
	activities: string,
	typeOfStay: string,
	accommodation: string,
	preferences: string,
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type GenerateListRequest = Override<NextApiRequest, { body: PromptValues }>;

const generatePrompt = (values: PromptValues) => {
	return `You are an expert travel planner. You have extensive knowledge of how to plan and pack for trips in all areas of the world. Your task is to help me generate a packing list based on the following information. 
	- Plural items should be split out and included as separate items with the exception of clothing items.
	- For additional items in the Personal Preferences and Habits section, include accessories for each item as well. These should be added in the same category and as separate items
	
	Destination: ${values.destination}
	Mode of Transport: ${values.transport}
	Amount of Bags: ${values.bags}
	Time of Year: ${values.timeOfYear}
	Length of Stay: ${values.lengthOfStay}
	Activities: ${values.activities}
	Type of Stay: ${values.typeOfStay}
	Accommodation: ${values.accommodation}
	Personal Preferences and Habits: ${values.preferences}
	
	Return a valid JSON array of objects with the following structure:
	{	
		“category”: “category of item”,
		“name” “name of item, should be three words max”,
		“quantity: “how many of the item I need”,
		“packed”: “default to false”,
		“required”: “make a decision on whether this item is essential or not, this is a true or false value”,
		“reason”: “A one sentence reason for packing the item”
	}`;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const model = 'gpt-3.5-turbo';
	const prompt = generatePrompt(req.body as PromptValues);
	console.log(prompt);

	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY || '',

	});
	const openai = new OpenAIApi(configuration);

	const response = await openai.createChatCompletion({
		model,
		messages: [
			{
				content: prompt,
				role: 'user',
			},
		],
	});
	const cleanedResponse = response.data.choices[0].message!.content.replace(/[\t\n\\]/g, '');
	// Parse the cleaned string into JSON object with reviver function
	const jsonObject = JSON.parse(cleanedResponse);
	console.log(jsonObject);
	res.status(200).json(jsonObject);
};

export default handler;

//TODO: add error handling to handler