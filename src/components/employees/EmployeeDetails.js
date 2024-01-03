import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
	getEmployeeByUserId,
	getEmployeeAndTheirTickets,
} from "../../services/employeeService.js"

export const EmployeeDetails = () => {
	const [employee, setEmployee] = useState({})
	const { employeeId } = useParams()

	const [matchingTickets, setMatchingTickets] = useState([])

	useEffect(() => {
		getEmployeeByUserId(employeeId).then((data) => {
			const employeeObj = data[0]
			setEmployee(employeeObj)
		})
	}, [employeeId])

	useEffect(() => {
		getEmployeeAndTheirTickets(employeeId).then((data) => {
			setMatchingTickets(data[0].employeeTickets.length)
		})
	}, [employeeId])

	useEffect(() => {})

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
				<i>Currently Working on {matchingTickets} Tickets</i>
			</div>
		</section>
	)
}
