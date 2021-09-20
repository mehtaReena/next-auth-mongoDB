import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY ='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'

const sendEmail = async ({ name, email }) => {
  console.log(" inside SendGrid Api ...." , name , email )
   fetch(SENDGRID_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${SENDGRID_API_KEY}`
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email
                }
              ],
              subject: 'Demo success :)'
            }
          ],
          from: {
            email: 'j.reena07@gmail.com',
            name: 'Test SendGrid'
          },
          content: [
            {
              type: 'text/html',
              value: `Congratulations <b>${name}</b>`
            }
          ]
        })
    }).then((res)=>{
      return res.json();

    }).then((res)=>{
         console.log(res)
    }).catch((error)=>{
          console.log(error)
    })

    // const result= await res.json()


}

export { sendEmail };