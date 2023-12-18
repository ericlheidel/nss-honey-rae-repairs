import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import "./Tickets.css"
import { Ticket } from "./Ticket.js"

export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([]) //[stateVariable, setterFunction]
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false) //[stateVariable, setterFunction]
  const [filteredTickets, setFilteredTickets] = useState([]) // [stateVariable, setterFunction]

  useEffect(() => { // asynchronously fetch all tickets
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray) 
      console.log("tickets set!")
    })
  }, []) //ONLY on initial render of component -> BECAUSE the array within it is empty

  useEffect(() => {
    if (showEmergencyOnly /* === true */) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency /* === true */
      )
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets]) // This function will run WHENEVER showEmergencyOnly or allTickets CHANGES

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div className="filter-bar">
        <button
          className="filter-btn btn-primary"
          onClick={() => (
            setShowEmergencyOnly(true)
          )}
        >
          Emergency
        </button>
        <button
          className="filter-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false)
          }}
        >Show All
        </button>
        <input
          type="text"
          placeholder="Search Tickets"
          className="ticket-search"
          />
      </div>
      <article className="tickets">
        {filteredTickets.map(
          (ticketObj) => {
            return <Ticket ticket={ticketObj} name="Joe" key={ticketObj.id}/>
          })}
        </article>
    </div>
  )
}