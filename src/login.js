import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginjs } from "./api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const navigate =useNavigate();
    const[userEmail,setuserEmail] =useState('');
    const[password,setpassword] = useState('');

    const handlSubmit = async(e)=>{
        e.preventDefault();
        const {success,data} = await loginjs(userEmail,password);
        if(success){
            navigate("/product",{state:{message:data}});
        }
        else{
            toast("Login error")
        }
    }
    return(
       
 <div className="sign-up-wrapper">
    <div className="sign-up">
        <h2 className="sign-up-title">Sign up</h2>
        <form onSubmit={handlSubmit}>
            <div className="input-box">
                <span>Email</span>
                <input type="text" value={userEmail} className="input" onChange={(e)=>setuserEmail(e.target.value)} placeholder="Enter Your email"/>
            </div>
            <div className="input-box">
                <span>Password</span>
                <input type="password" className="input" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Your Password"/>
            </div>
            <a className="forgot" href="/register">Or Sign Up With</a>
            <h3 className="sign-up-with">Forgot Password?</h3>
            <input type="submit" className="submit-btn" value="Submit"/>
        </form>
    </div>
</div>

    )
}