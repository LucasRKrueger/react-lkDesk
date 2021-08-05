import { useContext } from "react";
import AuthProvider, { AuthContext } from "../../contexts/auth";

const Dashboard = () =>{
    const {signOut} = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}
export default Dashboard;