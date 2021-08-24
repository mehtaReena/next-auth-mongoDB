import { getSession } from 'next-auth/client';

import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {


  if (req.method !== 'GET') {
    return;
  }


  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  //   const userEmail = session.user.email;

  const client = await connectToDatabase();

  const ticketCollection = client.db().collection('tickets');

  const status = await ticketCollection.find({}).toArray(function (err, result) {
    if (err) { throw err; }
    else {
      console.log(result);
      res.status(201).json({ message: 'Tickets', result });
    }
  });

  // client.close();

}

export default handler;
