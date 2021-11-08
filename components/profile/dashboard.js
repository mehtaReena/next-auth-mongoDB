import React from 'react';
import CreateTicket from './ticket-form';
import Tickets from './Tickets';
import { useEffect, useState } from 'react';
import styles from './ticket.module.css'



function Dashboard(props) {


    let [tickets, setTickets] = useState([])
    let [loading, setLoading] = useState(false)

    useEffect(() => {

        getTickets();
        getMapData();

    }, [])

    const getTickets = async () => {
        setLoading(true)
        let response = await fetch('/api/tickets/get-ticket')
        let data = await response.json()
        setLoading(false)
        console.log(data.result)
        setTickets(data.result)
        setLoading(false)
    }


    const getMapData = async () => {
        setLoading(true)
        let response = await fetch('/api/tickets/map-data')
        let data = await response.json()
        setLoading(false)
        console.log(data.result)
        setTickets(data.result)
        setLoading(false)
    }

    return (


        <div className={styles.container}>

            <CreateTicket />


            <div className={styles.ticketsList}>
            <table className={styles.data} >
                    <tr>
                        <th>Ticket</th>
                        <th>Assign to</th>
                        <th>Priority</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Chart</th>
                    </tr>

            {loading ? <h4>Loading</h4>
                :


                tickets.map((item, idx) =>

                    <Tickets
                        key= {idx}
                        id={item._id}
                        ticket={item.ticket}
                        email={item.email}
                        priority={item.priority}
                        status={item.status}
                        message={item.message} />
                )}


</table>

   </div>
        </div>

    );
}

export default Dashboard;