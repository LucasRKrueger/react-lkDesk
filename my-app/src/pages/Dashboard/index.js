import { useContext } from "react";
import AuthProvider, { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

const Dashboard = () =>{
    const {signOut} = useContext(AuthContext);

    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}
export default Dashboard;