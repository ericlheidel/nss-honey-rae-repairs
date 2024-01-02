import { Outlet, Route, Routes } from "react-router-dom"
import "./App.css"
import { CustomerList } from "./components/customers/CustomersList.js"
import { EmployeeList } from "./components/employees/EmployeesList.js"
import { TicketList } from "./components/tickets/TicketList.js"
import { NavBar } from "./components/nav/NavBar.js"

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
				<Route path="tickets" element={<TicketList />} />
				<Route path="customers" element={<CustomerList />} />
				<Route path="employees" element={<EmployeeList />} />
			</Route>
		</Routes>
	)
}
