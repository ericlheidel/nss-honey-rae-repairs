export const getCustomerByUserId = (userId) => {
	return fetch(
		`http://localhost:8000/customers?userId=${userId}&_expand=user`
	).then((res) => res.json())
}

export const updateCustomer = (user) => {
	return fetch(`http://localhost:8000/users/${user.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
}
