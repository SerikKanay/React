import "./index.css";
import { Outlet } from "react-router-dom";
import { Admin } from "./api";
import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';

export default function Header(){
    const navigate =useNavigate();
    const loc = useLocation();
    const [user, setuser] = useState([]);
    const[decode,setdecode] = useState([]);

    const logoutForm = () =>{
        localStorage.removeItem("user");
        navigate("/login",{ state: { message:" Log-Out"}});
        // window.location.reload();
    };
    const getAdmin=async()=>{
        const response = await Admin();
        navigate("/product", { state: { message: response+" Admin"}});
        
    }
    useEffect(() => {
        if(loc.state){
            toast(loc.state.message);
            loc.state = null;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        setuser(user);

    const token = localStorage.getItem("user");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setdecode(decoded);
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    } else {
      console.log('token found');
    }
    },  [loc])
    const handleSearchSubmit = (event) => {
      event.preventDefault();
  };
 
      return (
        <div>
        <ToastContainer/>
        <div className="main conteiner">
        <div className="nav">
            <div className="con">
                <h2 className="logo">
                    <form className="search" onSubmit={handleSearchSubmit}>
                        <input className="form-control mr-sm-2" type="search" name="search" placeholder="search" aria-label="Search" style={{ width: '115px' }} />
                        <button className="" type="submit">Search</button>
                    </form>
                </h2>
            </div>
            <div className="menu">
                <ul>
                {!user && (
               <>
                <li><a href="/login">Кіру</a></li>
                <li><a href="/register">Тіркелу</a></li>
               </>
              )}
              {
                user &&(
                    <>
                    <li><button onClick={getAdmin}>getAdmin</button></li>
                    <button onClick={logoutForm}>logout</button>
                    </>
                )
              }
                    <li><a href="/product">product</a></li>
                    {
                       decode && decode.role ==='ROLE_ADMIN' && (
                                <>
                                <li><a href="/users">users</a></li>
                                <li><a href="/addproduct">addprod</a></li>
                                <li><a href="/category">category</a></li>
                                </>
                            )
                        }
                </ul>
            </div>
        </div>
    </div>
    <Outlet/>
    </div>
      )
  }