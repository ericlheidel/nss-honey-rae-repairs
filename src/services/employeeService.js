export const getAllEmployees = () => {
	return fetch(`http://localhost:8000/employees?_expand=user`).then((res) =>
		res.json()
	)
}

export const getEmployeeByUserId = (userId) => {
	return fetch(
		`http://localhost:8000/employees?userId=${userId}&_expand=user`
	).then((res) => res.json())
}

export const getEmployeesAndTickets = (userId) => {
	return fetch(
		`http://localhost:8000/employees?userId=${userId}&_expand=user&_embed=employeeTickets`
	).then((res) => res.json())
}
