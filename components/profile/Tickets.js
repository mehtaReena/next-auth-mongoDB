import styles from './ticket.module.css'

function Tickets(props) {

    return (
        <tr>
        <td>{props.ticket}</td>
        <td>{props.email}</td>
        <td>{props.priority}</td>
        <td>{props.message}</td>
    </tr>




    );
}

export default Tickets;