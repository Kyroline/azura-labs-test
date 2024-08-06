import { Outlet } from "react-router-dom"
import UserNavbar from "../components/layout/UserNavbar"
import UserFooter from "../components/layout/UserFooter"

const UserLayout = () => {
    return (
        <>
            <UserNavbar />
            <Outlet />
            <UserFooter />
        </>
    )
}

export default UserLayout