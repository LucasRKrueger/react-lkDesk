import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AuthContext } from '../../contexts/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    const {signUp} = useContext(AuthContext)

    function handleSubmit(e){
      e.preventDefault();
      if(name !== '' && email !== '' && password !== ''){
        signUp(email, password, name)
      }
    }

    return (
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <img src={logo} alt="System logo"/>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Create new Account</button>
          </form>
          <Link to="/">Already have an Account? Click here</Link>
        </div>
      </div>
    );
}
  
export default SignUp;
  