import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.js"
import { Welcome } from "../welcome/Welcome.js"
import { TicketList } from "../components/tickets/TicketList.js"
import { EmployeeList } from "../components/employees/EmployeesList.js"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.js"
import { CustomerList } from "../components/customers/CustomersList.js"
import { CustomerDetails } from "../components/customers/CustomerDetails.js"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		const localHoneyUser = localStorage.getItem("honey_user")
		const honeyUserObject = JSON.parse(localHoneyUser)

		setCurrentUser(honeyUserObject)
	}, [])

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<NavBar />
						<Outlet />
					</>
				}
			>
				<Route index element={<Welcome />} />
				<Route
					path="tickets"
					element={<TicketList currentUser={currentUser} />}
				/>
				<Route path="employees">
					<Route index element={<EmployeeList />} />
					<Route path=":employeeId" element={<EmployeeDetails />} />
				</Route>
				<Route path="customers">
					<Route index element={<CustomerList />} />
					<Route path=":customerId" element={<CustomerDetails />} />
					{/* customers/:customerId (THE ABOVE LINE OF CODE)*/}
				</Route>
				<Route path="profile" element={<>Profile</>} />
			</Route>
		</Routes>
	)
}
