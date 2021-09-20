import { sendEmail } from '../../../utils/sendEmail';
import { getSession } from 'next-auth/client';



async function handler(req, res) {


  if (req.method !== 'POST') {
    return;
  }
  const { name,email  } = req.body;

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

    console.log(name, email)
  await sendEmail({ name, email });
  return res.status(200).end();

}
export default handler;
