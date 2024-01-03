import { Outlet, Route, Routes } from "react-router-dom"
import "./App.css"
import { CustomerList } from "./components/customers/CustomersList.js"
import { EmployeeList } from "./components/employees/EmployeesList.js"
import { TicketList } from "./components/tickets/TicketList.js"
import { NavBar } from "./components/nav/NavBar.js"
import { Welcome } from "./welcome/Welcome.js"
import { CustomerDetails } from "./components/customers/CustomerDetails.js"
import { EmployeeDetails } from "./components/employees/EmployeeDetails.js"

export const App = () => {
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
				<Route path="tickets" element={<TicketList />} />
				<Route path="employees">
					<Route index element={<EmployeeList />} />
					<Route path=":employeeId" element={<EmployeeDetails />} />
				</Route>
				<Route path="customers">
					<Route index element={<CustomerList />} />
					<Route path=":customerId" element={<CustomerDetails />} />
					{/* customers/:customerId (ABOVE LINE OF CODE)*/}
				</Route>
			</Route>
		</Routes>
	)
}
