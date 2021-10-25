import styles from './ticket.module.css'
import {  useState } from 'react';

function Tickets(props) {
    let [tickets, setTickets] = useState([])
    let [loading, setLoading] = useState(false)

    const removeMe= async()=>{

        let id=props.id
        let result = window.confirm("Do you really want to delete the ticket ? "+ props.ticket);

        if(result){

        setLoading(true)

          fetch('/api/tickets/delete-ticket', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticketId: id
            })
        })
        .then(response => {
            window.location.reload();
            return response.json( )
        })
        .then(data =>
            // this is the data we get after doing the delete request, do whatever you want with this data
            console.log(data)
        );
        setLoading(false)
        }
    }



    return (
        <tr>
        <td>{props.ticket}</td>
        <td>{props.email}</td>
        <td>{props.priority}</td>
        <td>{props.message}</td>
        <td>{props.status}</td>
        <td>✏️</td>
        <td onClick={removeMe}>❌</td>
    </tr>




    );
}

export default Tickets;