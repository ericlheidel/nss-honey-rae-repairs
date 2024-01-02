export const getAllTickets = () => {
	return fetch(`http://localhost:8000/serviceTickets?_embed=employeeTickets`).then(
		(res) => res.json())
}
