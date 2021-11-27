import "./login.css"
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";
import { useRef,useContext } from "react";


import axios from "axios"
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Actions";

function Login() {

    const userRef = useRef();
     const passwordRef  = useRef();
     const {dispatch,isFetching} = useContext(Context);

const handleSubmit = async (e)=>{
e.preventDefault();
dispatch(LoginStart());

try{
const res = await axios.post("/auth/login",{
    username:userRef.current.value,
    password:passwordRef.current.value
})
dispatch(LoginSuccess(res.data));

}

catch(err){
    dispatch(LoginFailure());
}
}


    return (
        <div className='login'>
            <span className='loginTitle'>Login</span>

            <form className='loginForm' onSubmit = {handleSubmit}>

                <label>Username</label>
                <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef}/>
                <label>Password</label>
                <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>

            <button className="loginRegisterButton">
                <Link className='link' to='/register'>Register</Link>
                </button>
        </div>
    )
}

export default Login
