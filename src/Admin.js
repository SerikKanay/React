import React, { useEffect, useState } from 'react';
import { Users,DeleteUser,getAdmin } from './api'; 
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const loc = useLocation();
    
    useEffect(() => {
        getUser();
        if(loc.state){
            toast(loc.state.message);
            loc.state = null;
        }
    }, [loc]); 

    const getUser = async () => {
        try {
            const response = await Users();
            setUser(response);
        } catch (error) {
            navigate("/login",{state:{message:error.message}});
            
        }
    };

    const handleEdit = async(userId) => {
        try {
            const response = await getAdmin(userId);
            window.location.reload();
            console.log(response);
        } catch (error) {
            console.log("Error :", error.message)
        }
        
    };

    const handleDelete = async(userId) => {
        try {
            const response = await DeleteUser(userId);
            navigate("/users", { state: { message: response.user+" deleted"}});
        } catch (error) {
            console.log("Error :", error.message)
        }
    };

    return (
        <div className="container mt-5">
            <h1>Users</h1>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((u) => (
                        <tr key={u.userId}>
                            <td>{u.userId}</td>
                            <td>{u.userEmail}</td>
                            <td>{u.role}</td>
                            <td>
                                <button 
                                    className="btn btn-primary btn-sm mr-2"
                                    onClick={() => handleEdit(u.userId)}
                                >
                                    Admin
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(u.userId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
