
import './header.css'
import {AuthContext} from '../../contexts/auth';
import { useContext } from 'react';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import {FiHome, FiUser, FiSettings} from 'react-icons/fi'

const Header = () => {
    const {user} = useContext(AuthContext);

    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar"/>
            </div>
            <Link to="/dashboard">
                <FiHome color="black" size={24}/>
                Tickets
            </Link>
            <Link to="/customers">
                <FiUser color="black" size={24}/>
                Customers
            </Link>
            <Link to="/profile">
                <FiSettings color="black" size={24}/>
                Settings
            </Link>
        </div>
    );
}

export default Header;