import { useState, useContext } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'

const Profile = () =>{
    const {user, signOut} = useContext(AuthContext);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatar] = useState(user && user.avatarUrl);

    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="My Profile">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25}/>
                            </span>
                            <input type="file" accept="image/*"/><br/>
                            {avatarUrl === null ?
                            <img src={avatar} width="250" height="250" alt="User Photo"/> 
                            :
                            <img src={avatarUrl} width="250" height="250" alt="User Photo"/>
                            }
                        </label>

                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setName(e.target.value)} disabled={true}/>

                        <button type="submit">Save</button>
                    </form>
                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;