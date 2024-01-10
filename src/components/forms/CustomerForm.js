import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.js"
import { updateCustomer } from "../../services/customerService.js"
import { useNavigate } from "react-router-dom"

export const CustomerForm = ({ currentUser }) => {
	const [customer, setCustomer] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		getUserById(currentUser.id).then((data) => {
			setCustomer(data[0])
		})
	}, [currentUser])

	const handleInputChange = (event) => {
		event.preventDefault()

		const stateCopy = { ...customer }
		stateCopy[event.target.name] = event.target.value
		setCustomer(stateCopy)
	}

	const handleEdit = (event) => {
		event.preventDefault()

		const editedCustomer = {
			id: currentUser.id,
			fullName: customer.fullName,
			email: customer.email,
			isStaff: false,
		}

		updateCustomer(editedCustomer).then(() => {
			navigate("/tickets")
		})
	}

	return (
		<form>
			<h2>Edit Profile</h2>
			<fieldset>
				<div className="form-group">
					Name
					<input
						type="text"
						name="fullName"
						className="form-control"
						value={customer?.fullName ? customer.fullName : ""}
						onChange={handleInputChange}
						required
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					Email
					<input
						type="text"
						name="email"
						className="form-control"
						value={customer?.email ? customer.email : ""}
						onChange={handleInputChange}
						required
					/>
					<button
						className="form-btn save-btn btn-warning"
						onClick={handleEdit}
					>
						Save
					</button>
				</div>
			</fieldset>
		</form>
	)
}
