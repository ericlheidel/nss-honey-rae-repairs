import { useEffect, useState } from "react"
import { User } from "../../users/User.js"
import { getNonStaffUsers } from "../../services/userService.js"
import "./Customers.css"


export const CustomerList = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getNonStaffUsers().then(customerArray => {
      setCustomers(customerArray)
    })
  }, [])

  return (
    <div className="customers">
      {customers.map(customerObj => {
        return <User user={customerObj} key={customerObj.id} />
      })}
    </div>
  )
}

