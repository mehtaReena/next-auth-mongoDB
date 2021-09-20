import React, { useState } from 'react';
import styles from './ticket.module.css'
function CreateTicket(props) {
    const [email, setEmail] = useState('');
    const [priority, setPriority] = useState('');
    const [ticket, setTicket] = useState('');
    const [message, setMessage] = useState('');



    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(priority, ticket, message, email)
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
                ticket: ticket,
                email: email,
                priority: priority,
                message: message

            }),
        });
        //Await for data for any desirable next steps
        const data = await res.json();
        console.log(data);



        //POST form values
        const result = await fetch('/api/email/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: "reena",
                email: email,


            }),
        });
        console.log(result)
        // const response = await result.json();
        // console.log(response);
          alert(" Email has been sent! Please check your mailbox")

         window.location.reload();

    };



    return (
        <div className={styles.tickets}>
            <div className={styles.header}>
                <h2 style={{ alignSelf: "center" }}>Create New Ticket</h2>
            </div>

            <form >

                <div className={styles.control}>
                    <div className={styles.row}>
                        <div className={styles.lable}>
                            <label htmlFor="name">Ticket</label>
                        </div>
                        <div className={styles.width}>
                            <input type="text" id="name" placeholder="ticket" required
                                value={ticket} onChange={e => setTicket(e.target.value)} style={{
                                    height: "30%",
                                    padding: "10px", borderRadius: "5px"
                                }}></input>
                        </div>
                    </div>
                </div>
                <div className={styles.control}>
                    <div className={styles.row}>
                        <div className={styles.lable}>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={styles.width}>
                            <input type="email" id="email" placeholder="Your email" required
                                value={email} onChange={e => setEmail(e.target.value)}
                                style={{
                                    height: "30%",
                                    padding: "10px", borderRadius: "5px"
                                }} />
                        </div>
                    </div>
                </div>

                <div className={styles.control}>
                    <div className={styles.row}>
                        <div className={styles.lable}>
                            <label htmlFor="favFramework">Priority</label>
                        </div>
                        <div className={styles.width}>
                            <select id="priority" value={priority}
                                onChange={e => setPriority(e.target.value)}
                                style={{
                                    height: "30%",
                                    padding: "10px", borderRadius: "5px"
                                }}>
                                <option value="high">High</option>
                                <option value="mid">Low</option>
                                <option value="low">Mid</option>

                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.control}>
                    <div className={styles.row}>
                        <div className={styles.lable}>
                            <label htmlFor="message">Description</label>
                        </div>
                        <div className={styles.width}>
                            <textarea id="message" placeholder="Desc about ticket"
                                value={message} onChange={e => setMessage(e.target.value)}
                                style={{
                                    height: "25%",
                                    padding: "10px", borderRadius: "5px"
                                }} />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit" onClick={onFormSubmit}
                        className={styles.button}>

                        Submit</button>
                </div>

            </form>

        </div>
    );
}

export default CreateTicket;