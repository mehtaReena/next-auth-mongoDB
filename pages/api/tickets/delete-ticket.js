import { getSession } from 'next-auth/client';
const { ObjectId } = require('mongodb')

import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
    try {


  if (req.method !== 'DELETE') {
    return;
  }


  const session = await getSession({ req: req });
  const { ticketId } = req.body;

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  //   const userEmail = session.user.email;

  console.log("   req.params   "+ ticketId)

  const client = await connectToDatabase();

  const ticketCollection = client.db().collection('tickets');

   console.log(typeof ObjectId );
  let id = ObjectId(ticketId);

  console.log(" ObjectId  removed "+  id)

  await client.db().collection('tickets').deleteOne({
    _id: new ObjectId(ticketId),
});
return res.json({
  message: 'Post deleted successfully',
  success: true,
});

}
catch (e) {
 console.log('Error Occured', e.message)
 return  e.message
}









}

export default handler;
