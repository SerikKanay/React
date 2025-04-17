import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerjs } from "./api";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm(){
    
    const navigate =useNavigate();
    const[userName,setuserName] =useState('');
    const[email,setemail] =useState('');
    const[password,setpassword] = useState('');

    const handlSubmit = async(e)=>{
        e.preventDefault();
        const {success,data} = await registerjs(userName,email,password);
        if(success){
            navigate("/login",{state:{message:data}});
        }
        else{
            toast(data)
        }
    }

    return(
        
<div className="centerForm">
    <div>
    <div className="success">
    </div>
    <div className="sign-up-wrapper">
        <div className="sign-up">
            <h2 className="sign-up-title">Register</h2>
            <form onSubmit={handlSubmit}>
                <div className="input-box">
                    <span>Name</span>
                    <input type="text" value={userName} onChange={(e)=>setuserName(e.target.value)} className="input" required placeholder="Enter your name"/>
                </div>
                <div className="input-box">
                    <span>Email</span>
                    <input type="email" value={email} className="input" onChange={(e)=>setemail(e.target.value)} placeholder="Enter Your Email"/>
                </div>
                <div className="input-box">
                    <span>Password</span>
                    <input type="password" className="input" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Your Password"/>
                </div>
                <h3 className="sign-up-with"><a className="" href="/login">Or Sign In With</a></h3>
                <div className="input-box">
                    <button type="submit" className="submit-btn">Register</button>
                </div>
            </form>
        </div>
    </div>
    </div>
</div>
    )
}