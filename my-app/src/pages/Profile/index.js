import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings } from 'react-icons/fi';

const Profile = () =>{
    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="My Profile">
                    <FiSettings size={25} />
                </Title>

            </div>
        </div>
    )
}

export default Profile;