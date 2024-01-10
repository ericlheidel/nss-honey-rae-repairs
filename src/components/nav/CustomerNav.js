import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.js"

export const CustomerNav = ({ currentUser }) => {
	const navigate = useNavigate()

	return (
		<ul className="navbar">
			<li className="navbar-item">
				<Link className="navbar-link" to="/tickets">
					Tickets
				</Link>
			</li>
			<li className="navbar-item">
				<Link className="navbar-link" to="profile/">
					Profile
				</Link>
			</li>
			{localStorage.getItem("honey_user") ? (
				<li className="navbar-item navbar-logout">
					<Link
						className="navbar-link"
						to=""
						onClick={() => {
							localStorage.removeItem("honey_user")
							navigate("/", { replace: true })
						}}
					>
						Logout
					</Link>
				</li>
			) : (
				""
			)}
		</ul>
	)
}
