import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
	getAllEmployees,
	getEmployeeByUserId,
} from "../../services/employeeService.js"
import { getAllEmployeeTickets } from "../../services/ticketService.js"

export const EmployeeDetails = () => {
	const [employee, setEmployee] = useState({})
	const { employeeId } = useParams()

	const [employees, setEmployees] = useState([])
	const [employeeTickets, setEmployeeTickets] = useState([])
	const [matchingTickets, setMatchingTickets] = useState([])

	useEffect(() => {
		getEmployeeByUserId(employeeId).then((data) => {
			const employeeObj = data[0]
			setEmployee(employeeObj)
		})
	}, [employeeId])

	useEffect(() => {
		getAllEmployees().then((employeesArray) => {
			setEmployees(employeesArray)
		})
	}, [])

	useEffect(() => {
		getAllEmployeeTickets().then((employeeTicketsArray) => {
			setEmployeeTickets(employeeTicketsArray)
		})
	}, [])

	return (
		<section className="employee">
			<header className="employee-header">{employee.user?.fullName}</header>
			<div>
				<span className="employee-info">Email: </span>
				{employee.user?.fullName}
			</div>
			<div>
				<span className="employee-info">Specialty : </span>
				{employee.specialty}
			</div>
			<div>
				<span className="employee-info">Rate : </span>
				{employee.rate}
			</div>
			<div>
				<p></p>
				<i>Currently Working on {} Tickets</i>
			</div>
		</section>
	)
}
