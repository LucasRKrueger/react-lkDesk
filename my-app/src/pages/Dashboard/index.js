import { useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () =>{
    const [tickets, setTickets] = useState([1]);

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Services">
                    <FiMessageSquare size={25}/>
                </Title>

                {tickets.length === 0 ? (
                    <div className="container dashboard">
                        <span>There isn't any registered tickets..</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#fff"/>
                            New Ticket
                        </Link>
                    </div>
                ) :(
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#fff"/>
                            New Ticket
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created On</th>
                                    <th scope="col">#</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Customer">Lucas Krueger</td>
                                    <td data-label="Title">Test</td>
                                    <td data-label="Status"><span className="badge" style={{backgroundColor: '#5cb85c'}}>Open</span></td>
                                    <td data-label="CreatedOn">17/08/2021</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3586f6'}}>
                                            <FiSearch color="#fff" size={17}/>
                                        </button>
                                        <button className="action" style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color="#fff" size={17}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
                            
            </div>
        </div>
    )
}
export default Dashboard;