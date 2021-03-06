import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import {useHistory, useParams} from 'react-router-dom';
import './new.css';
import { FiPlusCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

const New = () => {
    const {id} = useParams();
    const history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomerns] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [title, setTitle] = useState('Support');
    const [status, setStatus] = useState('Open');
    const [complement, setComplement] = useState('');
    const [customerId, setCustomerId] = useState(false)

    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) =>{
                let list = [];
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        name: doc.data().name,
                    })
                })
                if(list.length === 0){
                    setLoadingCustomerns(false);
                    setCustomers([{id: 1, name: ''}])
                    return;
                }
                setCustomers(list);
                setLoadingCustomerns(false);

                console.log(id)
                if(id){
                    getById(list);
                }

            })
            .catch(() => {
                setLoadingCustomerns(false);
                setCustomers([{id: 1, name: ''}])
            })
        }
        loadCustomers();
    },[])

    async function getById(list){
        await firebase.firestore().collection('tickets').doc(id)
        .get()
        .then((snapshot) =>{
            setTitle(snapshot.data().title)
            setStatus(snapshot.data().status)
            setComplement(snapshot.data().complement)
            console.log(snapshot.data().customerId)
            let index = list.findIndex(item => item.id === snapshot.data().customerId);
            console.log(index)
            setCustomerSelected(index)
            setCustomerId(true)
        })
        .catch(() =>{
            setCustomerId(false)
        })
    }

    async function handleRegister(e){
        e.preventDefault();

        if(customerId){
            await firebase.firestore().collection('tickets')
            .doc(id)
            .update({
                customer: customers[customerSelected].name,
                customerId: customers[customerSelected].id,
                title: title,
                status: status,
                complement: complement,
                userId: user.uid
            })
            .then(() =>{
                toast.success('Sucessfully updated')
                setCustomerSelected(0)
                setComplement('')
                history.push('/dashboard')
            })
            .catch(() =>{
                toast.error('Error on update')
            })
        }
        else{
            await firebase.firestore().collection('tickets')
            .add({
                createdOn: new Date(),
                createdByUser: user.uid,
                customer: customers[customerSelected].name,
                customerId: customers[customerSelected].id,
                title: title,
                status: status,
                complement: complement
            })
            .then(() =>{
                toast.success('Sucessfully registered.')
                setComplement('');
                setCustomerSelected(0)
            })
            .catch(() => {
                toast.error('An error has occurred')
            })
            }
    }

    function handleChangeSelect(e){
        setTitle(e.target.value);
    }

    function handleRadioChange(e){
        setStatus(e.target.value);
    }
    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value);
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="New Ticket">
                    <FiPlusCircle size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Customer</label>
                        {loadingCustomers ? (
                            <input type="text" disabled={true} value="Loading Customers..." />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) =>{
                                    return(
                                        <option key={item.id} value={index}>{item.name}</option>                                    
                                    )
                                })}
                            </select>
                        )}
                        
                        <label>Title</label>
                        <select value={title} onChange={handleChangeSelect}>
                            <option value="Support">Support</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Financial">Financial</option>
                        </select>
                        <label>Status</label>
                        <div className="status">
                            <input 
                            type="radio"
                            name="radio"
                            value="Open"
                            onChange={handleRadioChange}
                            checked={status === 'Open'}
                            />
                            <span>Open</span>

                            <input 
                            type="radio"
                            name="radio"
                            value="In Progress"
                            onChange={handleRadioChange}
                            checked={status === 'In Progress'}
                            />
                            <span>In Progress</span>

                            <input 
                            type="radio"
                            name="radio"
                            value="Closed"
                            onChange={handleRadioChange}
                            checked={status === 'Closed'}
                            />
                            <span>Closed</span>
                        </div>
                        <label>Complement</label>
                        <textarea 
                        type="text"
                        placeholder="Tell us more about your problem (optional)."
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        />
                        <button type="submit">New</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New;