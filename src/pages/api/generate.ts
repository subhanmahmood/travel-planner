// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export enum Accommodation {
	Hotel,
	Airbnb,
	Hostel,
	Resort,
	BedAndBreakfast,
	Campsite,
	Homestay,
	Couchsurfing,
}

export enum Activities {
	Sightseeing = 'Sightseeing',
	Hiking = 'Hiking',
	WalkingTours = 'Walking Tours',
	Cycling = 'Cycling',
	BeachActivities = 'Beach activities (swimming, sunbathing, surfing, etc.)',
	WaterSports = 'Water sports (snorkeling, diving, kayaking, etc.)',
	SnowSports = 'Skiing/Snowboarding and other snow sports',
	CulturalExperiences = 'Cultural experiences (museums, art galleries, local festivals, etc.)',
	FoodTours = 'Food and drink experiences (tastings, cooking classes, etc.)',
	Shopping = 'Shopping',
	SpaAndWellness = 'Spa and wellness activities',
	OutdoorAdventures = 'Outdoor adventures (rafting, zip-lining, bungee jumping, etc.)',
	ThemeParks = 'Theme parks',
	SportsEvents = 'Sports events (soccer, basketball, etc.)',
	Work = 'Working',
	Photography = 'Photography tours etc.',
}

export enum ModesOfTransport {
	Airplane = 'Airplane',
	Train = 'Train',
	Bus = 'Bus',
	Car = 'Car',
	Taxi = 'Taxi',
	RideSharing = 'Ride-sharing services',
	Bicycle = 'Bicycle',
	Motorbike = 'Motorbike/Scooter',
	Boat = 'Boat/Ferry',
	CruiseShip = 'Cruise ship',
	RV = 'RV/Campervan',
	Helicopter = 'Helicopter',
	HotAirBalloon = 'Hot air balloon',
	CamelRide = 'Camel ride',
	Rickshaw = 'Rickshaw ride',
	Walking = 'Walking',
}

export type PromptValues = {
	destination: string,
	transport?: ModesOfTransport | string,
	bags: number | undefined,
	timeOfYear: string,
	lengthOfStay: string,
	activities?: Activities | string,
	accommodation?: Accommodation | string,
};

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
	Accommodation: ${values.accommodation}
	
	Return a valid JSON array of objects with the following structure:
	{	
		“category”: “category of item”,
		“name” “name of item, should be three words max”,
		“quantity": “how many of the item I need”,
		“packed”: “default to false”,
		“required”: “make a decision on whether this item is essential or not, this is a true or false value”,
		“reason”: “A one sentence reason for packing the item”
	}`;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(402).send({ error: 'Method now allowed' });
	}

	const model = 'gpt-3.5-turbo';
	const prompt = generatePrompt(req.body as PromptValues);

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

	let jsonObject;

	try {
		jsonObject = JSON.parse(cleanedResponse);
	} catch (err) {
		res.status(500).send({ error: 'There was an error generating your list. Please try again' });
	}
	res.status(200).json(jsonObject);
};

export default handler;