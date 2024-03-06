import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/Balance"

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <Balance />
      <Users />
    </div>
  )
}
