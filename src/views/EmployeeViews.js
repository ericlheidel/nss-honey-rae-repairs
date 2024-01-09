import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.js"
import { Welcome } from "../welcome/Welcome.js"
import { TicketList } from "../components/tickets/TicketList.js"
import { EmployeeList } from "../components/employees/EmployeesList.js"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.js"
import { CustomerList } from "../components/customers/CustomersList.js"
import { CustomerDetails } from "../components/customers/CustomerDetails.js"
import { EmployeeForm } from "../components/forms/EmployeeForm.js"

export const EmployeeViews = ({ currentUser }) => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<EmployeeNav />
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
				</Route>
				<Route
					path="profile"
					element={<EmployeeForm currentUser={currentUser} />}
				/>
			</Route>
		</Routes>
	)
}
