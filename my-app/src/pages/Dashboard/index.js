import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from "../../services/firebaseConnection"
import { format } from "date-fns";

const listRef = firebase.firestore().collection('tickets').orderBy('createdOn', 'desc');

const Dashboard = () =>{
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    useEffect(() => {

        loadTickets();

        return () => {

        }
    }, [])

    async function loadTickets(){
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
        .catch((err) =>{
            setLoadingMore(false)
        })
        setLoading(false);
    }

    async function handleMore(){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .then((snapshot) =>{
            updateState(snapshot);
        })
    }

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;
        if(!isCollectionEmpty){
            let list = [];

            snapshot.forEach((doc) =>{
                list.push({
                    id: doc.id,
                    title: doc.data().title,
                    customer: doc.data().customer,
                    customerId: doc.data().customerId,
                    createdOn: format(doc.data().createdOn.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complement: doc.data().complement
                })
            })
            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setTickets(tickets => [...tickets, ...list]);
            setLastDocs(lastDoc);
        } else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className="content">
                    <Title name="Services">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className="container dashboard">
                        <span>Searching Tickects...</span>
                    </div>
                </div>
            </div>
        );
    }

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
                                {tickets.map((item,index) =>{
                                    return(
                                <tr key={index}>
                                    <td data-label="Customer">{item.customer}</td>
                                    <td data-label="Title">{item.title}</td>
                                    <td data-label="Status"><span className="badge" style={{backgroundColor: '#5cb85c'}}>{item.status}</span></td>
                                    <td data-label="CreatedOn">{item.createdOn}</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3586f6'}}>
                                            <FiSearch color="#fff" size={17}/>
                                        </button>
                                        <button className="action" style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color="#fff" size={17}/>
                                        </button>
                                    </td>
                                </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Searching data...</h3>}
                       { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Search More</button>}
                    </>
                )}
                            
            </div>
        </div>
    )
}
export default Dashboard;