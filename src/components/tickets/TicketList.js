import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import "./Tickets.css"
import { Ticket } from "./Ticket.js"
import { TicketFilterBar } from "./TicketFilterBar.js"

export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([]) //[stateVariable, setterFunction]
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false) //[stateVariable, setterFunction]
  const [filteredTickets, setFilteredTickets] = useState([]) // [stateVariable, setterFunction]
  const [searchTerm, setSearchTerm] = useState("")

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

  useEffect(() => {
    const foundTickets = allTickets.filter(
      (ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar 
        setShowEmergencyOnly={setShowEmergencyOnly}
        setSearchTerm={setSearchTerm}
      />
      <article className="tickets">
        {filteredTickets.map(
          (ticketObj) => {
            return <Ticket ticket={ticketObj} key={ticketObj.id}/>
          })}
        </article>
    </div>
  )
}