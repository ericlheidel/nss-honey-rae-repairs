export const getAllTickets = () => {
	return fetch(
		`http://localhost:8000/serviceTickets?_embed=employeeTickets`
	).then((res) => res.json())
}

export const getAllEmployeeTickets = () => {
	return fetch(`http://localhost:8000/employeeTickets`).then((res) =>
		res.json()
	)
}
