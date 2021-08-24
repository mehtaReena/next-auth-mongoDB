import React, { useState } from 'react';
import styles from './ticket.module.css'

function CreateTicket(props) {
    const [email, setEmail] = useState('');
    const [priority, setPriority] = useState('');
    const [ticket, setTicket] = useState('');
    const [message, setMessage] = useState('');

    const onFormSubmit = async (e) => {
        e.preventDefault();
        //Getting value from useRef()
         console.log( priority , ticket, message, email)
        //Validation
        if (!priority || !email.includes('@') || !ticket) {
            alert('Invalid details');
            return;
        }
        //POST form values
        const res = await fetch('/api/tickets/create-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticket:ticket,
                email: email,
                priority: priority,
                message:message

            }),
        });
        //Await for data for any desirable next steps
        const data = await res.json();
        console.log(data);
        // window.location.reload();

    };



    return (
        <div className={styles.tickets}>

            <form>
                <div className={styles.formcontrol}>
                    <label htmlFor="name">Ticket</label>
                    <input type="text" id="name" placeholder="ticket" required
                     value={ticket} onChange={e => setTicket(e.target.value)} style={{width:"70%", height:"30%" ,
                     padding:"10px", borderRadius :"5px"}}></input>
                </div>
                <div className={styles.formcontrol}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Your email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={{width:"70%", height:"30%" ,
                     padding:"10px", borderRadius :"5px"}}/>
                </div>

                <div className={styles.formcontrol}>
                    <label htmlFor="favFramework">Priority</label>
                    <select id="priority"  value={priority}
                     onChange={e => setPriority(e.target.value)}
                     style={{width:"70%", height:"30%" ,
                     padding:"10px", borderRadius :"5px"}}>
                        <option value="high">High</option>
                        <option value="mid">Low</option>
                        <option value="low">Mid</option>

                    </select>
                </div>
                <div className={styles.formcontrol}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Leave a message"
                    value={message} onChange={e => setMessage(e.target.value)}
                    style={{width:"70%", height:"30%" ,
                     padding:"10px", borderRadius :"5px"
                     }}/>
                </div>

                <div style={{display:"flex" ,justifyContent:"center"}}>
                    <button type="submit" onClick={onFormSubmit}
                     style={{width:"30%", height:"40%" ,
                     padding:"10px", borderRadius :"9px" ,
                     color:'white',
                     border: "1px solid white",
                     fontWeight:"700",
                     textTransform:"uppercase",
                     backgroundColor:"rgb(56,1,92)"}}>Submit</button>
                </div>
            </form>

        </div>
    );
}

export default CreateTicket;