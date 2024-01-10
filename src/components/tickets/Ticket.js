import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.js"
import {
	assignTicket,
	deleteTicket,
	updateTicket,
} from "../../services/ticketService.js"
import { useNavigate } from "react-router-dom"

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
	const [employees, setEmployees] = useState([])
	const [assignedEmployee, setAssignedEmployee] = useState({})

	const navigate = useNavigate()

	useEffect(() => {
		getAllEmployees().then((employeesArray) => {
			setEmployees(employeesArray)
		})
	}, [])

	useEffect(() => {
		const foundEmployee = employees.find(
			(employee) => employee.id === ticket.employeeTickets[0]?.employeeId
		)
		setAssignedEmployee(foundEmployee)
	}, [employees, ticket])

	const handleClaim = () => {
		const currentEmployee = employees.find(
			(employee) => employee.userId === currentUser.id
		)

		const newEmployeeTicket = {
			employeeId: currentEmployee.id,
			serviceTicketId: ticket.id,
		}

		assignTicket(newEmployeeTicket).then(() => {
			getAndSetTickets()
		})
	}

	const handleClose = () => {
		const closedTicket = {
			id: ticket.id,
			userId: ticket.userId,
			description: ticket.description,
			emergency: ticket.emergency,
			dateCompleted: new Date(),
		}

		updateTicket(closedTicket).then(() => {
			getAndSetTickets()
		})
	}

	const handleDelete = () => {
		deleteTicket(ticket.id).then(() => {
			getAndSetTickets()
		})
	}

	return (
		<section className="ticket" key={ticket.id}>
			<header className="ticket-info">#{ticket.id}</header>
			<div>{ticket.description}</div>
			<footer>
				<div>
					<div className="ticket-info">assignee</div>
					<div>
						{assignedEmployee ? assignedEmployee.user?.fullName : "None"}
					</div>
				</div>
				<div>
					<div className="ticket-info">emergency</div>
					<div>{ticket.emergency ? "yes" : "no"}</div>
				</div>
				<div className="btn-container">
					{/* if the logged in user is an employee and there's no employee ticket associated with the service ticket then a button to claim the ticket should display */}

					{/* 
					// !!! currentUser.isStaff && !assignedEmployee && DO >THIS<, THEN STOP
					 */}

					{currentUser.isStaff && !assignedEmployee ? (
						<button className="btn btn-secondary" onClick={handleClaim}>
							Claim
						</button>
					) : (
						""
					)}
					{/* if the logged in user is the assigned employee for the ticket and there is no date completed then a button to close the ticket should display */}
					{assignedEmployee?.userId === currentUser.id &&
					!ticket.dateCompleted ? (
						<button className="btn btn-warning" onClick={handleClose}>
							Close
						</button>
					) : (
						""
					)}

					{/* 
					// !!! NEW WAY OF DOING ***{"" ? "" : ""}***
					// !!! If currentUser.isStaff === false Then do >THIS<, THEN STOP
					// !!! LOOK ABOVE FOR ANOTHER EXAMPLE
					*/}

					{!currentUser.isStaff && (
						<>
							<button
								className="btn btn-warning btn-edit"
								onClick={() => {
									navigate(`/tickets/edit/${ticket.id}`)
								}}
							>
								Edit
							</button>
							<button className="btn btn-warning" onClick={handleDelete}>
								Delete
							</button>
						</>
					)}
				</div>
			</footer>
		</section>
	)
}
