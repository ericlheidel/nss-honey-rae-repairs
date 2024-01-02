export const getAllEmployees = () => {
	return fetch(`http://localhost:8000/employees?_expand=user`).then(
		(res) => res.json())
}
