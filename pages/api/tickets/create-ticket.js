import { getSession } from 'next-auth/client';

import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {


  if (req.method !== 'POST') {
    return;
  }
  const { ticket,email, priority,message  } = req.body;

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

//   const userEmail = session.user.email;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('tickets');

  const status = await usersCollection.insertOne({
    ticket,
    email,
    priority,
    message

 });



  // client.close();
  res.status(201).json({ message: 'Ticket created', ...status });
}

export default handler;
