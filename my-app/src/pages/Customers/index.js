import './customers.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify';

const Customers = () => {

    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');    

    async function handleAdd(e){
        e.preventDefault();

        if(name !== '' && cnpj !== '' && address !== ''){
            await firebase.firestore().collection('customers')
            .add({
                name: name,
                cnpj: cnpj,
                address: address
            })
            .then(() =>{
                setName('');
                setCnpj('');
                setAddress('');
                toast.success('Customer successfully registered!')
            })
            .catch(() =>{
                toast.error('An error has occurred!')
            })
        } else {
            toast.error('Please fill out all fields in the form below.')
        }
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Customers">
                    <FiUser size={25}/>
                </Title>
            
                <div className="container">
                    <form className="form-profile" onSubmit={handleAdd}>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                        <label>Cnpj</label>
                        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>

                        <label>Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>

                        <button type="submit">New Customer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Customers;