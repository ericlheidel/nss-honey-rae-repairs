import { useEffect, useState } from "react"
import { EmployeeViews } from "./EmployeeViews.js"
import { CustomerViews } from "./CustomerViews.js"

export const ApplicationViews = () => {
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		const localHoneyUser = localStorage.getItem("honey_user")
		const honeyUserObject = JSON.parse(localHoneyUser)

		setCurrentUser(honeyUserObject)
	}, [])

	return currentUser.isStaff ? (
		<EmployeeViews currentUser={currentUser} />
	) : (
		<CustomerViews currentUser={currentUser} />
	)
}
