import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import "./Tickets.css"
import { Ticket } from "./Ticket.js"
import { TicketFilterBar } from "./TicketFilterBar.js"

export const TicketList = ({ currentUser }) => {
	const [allTickets, setAllTickets] = useState([]) //[stateVariable, setterFunction]
	const [showEmergencyOnly, setShowEmergencyOnly] = useState(false) //[stateVariable, setterFunction]
	const [showOpenOnly, setShowOpenOnly] = useState(false)
	const [filteredTickets, setFilteredTickets] = useState([]) // [stateVariable, setterFunction]
	const [searchTerm, setSearchTerm] = useState("")

	const getAndSetTickets = () => {
		getAllTickets().then((ticketsArray) => {
			if (currentUser.isStaff) {
				setAllTickets(ticketsArray)
			} else {
				const customerTickets = ticketsArray.filter(
					(ticket) => ticket.userId === currentUser.id
				)
				setAllTickets(customerTickets)
			}
		})
	}

	useEffect(() => {
		getAndSetTickets()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]) //ONLY on initial render of component -> BECAUSE the array within it is empty

	// !!! SHOW EMERGENCY TICKETS OR NOT-EMERGENCY TICKETS ONLY BUTTON
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

	// !!! SHOW SEARCHED TICKETS SEARCH BAR
	useEffect(() => {
		const foundTickets = allTickets.filter(
			(ticket) =>
				ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) // TODO
		)
		setFilteredTickets(foundTickets)
	}, [searchTerm, allTickets])

	// !!! SHOW OPEN TICKETS ONLY NOT-OPENED TICKETS ONLY BUTTON
	useEffect(() => {
		if (showOpenOnly) {
			const openTickets = allTickets.filter(
				(ticket) => ticket.dateCompleted === ""
			)
			setFilteredTickets(openTickets)
		} else {
			setFilteredTickets(allTickets)
		}
	}, [showOpenOnly, allTickets])

	return (
		<div className="tickets-container">
			<h2>Tickets</h2>
			<TicketFilterBar
				setShowEmergencyOnly={setShowEmergencyOnly}
				setShowOpenOnly={setShowOpenOnly}
				setSearchTerm={setSearchTerm}
				currentUser={currentUser}
			/>
			<article className="tickets">
				{filteredTickets.map((ticketObj) => {
					return (
						<Ticket
							ticket={ticketObj}
							currentUser={currentUser}
							getAndSetTickets={getAndSetTickets}
							key={ticketObj.id}
						/>
					)
				})}
			</article>
		</div>
	)
}
