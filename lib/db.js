import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	const client = await
	MongoClient.connect('mongodb+srv://reenamehta:reenamehta@cluster0.n4mko.mongodb.net/sampledb?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}
