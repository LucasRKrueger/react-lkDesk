import { useState, useContext } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify';

const Profile = () =>{
    const {user, signOut, setUser, storageUser} = useContext(AuthContext);

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e){
        const image = e.target.files[0];
        if(image){
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image))
            } else{
                alert('Image type must be png or jpeg')
                setImageAvatar(null)
                return null;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;
        await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=>{
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url) => {
                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: url,
                    name: name
                })
                .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: url,
                        name: name
                    };
                    setUser(data);
                    storageUser(data);
                    toast.success('Updated successfully');
                })
            })
        })
    }

    async function handleSave(e){
        e.preventDefault();
        if(imageAvatar === null && name !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                name: name
            })
            .then(() =>{
                let data = {
                    ...user,
                    name: name
                };
                setUser(data);
                storageUser(data);
            })
        } else if (name !== '' && imageAvatar !== null){
            handleUpload();
        }
    }

    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="My Profile">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25}/>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br/>
                            {avatarUrl === null ?
                            <img src={avatar} width="250" height="250" alt="User"/> 
                            :
                            <img src={avatarUrl} width="250" height="250" alt="User"/>
                            }
                        </label>

                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={true}/>

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