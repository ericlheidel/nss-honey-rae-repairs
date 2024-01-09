import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../welcome/Welcome.js"
import { CustomerNav } from "../components/nav/CustomerNav.js"
import { TicketList } from "../components/tickets/TicketList.js"

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
				<Route
					path="tickets"
					element={<TicketList currentUser={currentUser} />}
				/>
			</Route>
		</Routes>
	)
}
