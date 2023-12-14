import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketService.js"
import "./App.css"

export const App = () => {
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
  }, [showEmergencyOnly, allTickets]) // This function will run WHENEVER showEmergencyOnly of allTickets CHANGES

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
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
      </div>
      <article className="tickets">
        {filteredTickets.map(
          (ticket) => {
            return (
              <section className="ticket" key={ticket.id}>
                <header className="ticket-info">{ticket.id}</header>
                <div>{ticket.description}</div>
                <footer>
                  <div>
                    <div className="ticket-info">emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                  </div>
                </footer>
              </section>
            )
          })}
        </article>
    </div>
  )
}