import styles from './ticket.module.css'

function Tickets(props) {

    return (
        <div className ={styles.card}>
            <p>Ticket : {props.ticket}</p>
            <p> Asign to :{props.email}</p>
            <p> Priorty :{props.priority}</p>
            <p> Description :{props.message}</p>

        </div>

    );
}

export default Tickets;