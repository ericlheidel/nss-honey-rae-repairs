import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../welcome/Welcome.js"
import { CustomerNav } from "../components/nav/CustomerNav.js"
import { TicketList } from "../components/tickets/TicketList.js"
import { TicketForm } from "../components/forms/TicketForm.js"
import { EditTicketForm } from "../components/forms/EditTicketForm.js"
import { CustomerForm } from "../components/forms/CustomerForm.js"

export const CustomerViews = ({ currentUser }) => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<CustomerNav />
						<Outlet />
					</>
				}
			>
				<Route index element={<Welcome />} />
				<Route path="tickets">
					<Route index element={<TicketList currentUser={currentUser} />} />
					<Route
						path="create"
						element={<TicketForm currentUser={currentUser} />}
					/>
					<Route
						path="edit/:ticketId"
						element={<EditTicketForm currentUser={currentUser} />}
					/>
				</Route>
				<Route
					path="profile"
					element={<CustomerForm currentUser={currentUser} />}
				/>
			</Route>
		</Routes>
	)
}
