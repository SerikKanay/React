import { useState, useEffect } from "react";
import { saveCategory, getCategory, deleteCategory } from "./api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";


export default function CreateCat() {
    const location = useLocation();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories();
        if (location.state && location.state.message) {
            toast(location.state.message);
            location.state = null; 
        }
    }, [location]);

    const handleName = (ev) => {
        setNewCategoryName(ev.target.value);
    }

    const handleForm = async (ev) => {
        ev.preventDefault();
        try {
            const save = await saveCategory({ name: newCategoryName });
            toast.success(`${save.name} created successfully!`);
            setNewCategoryName('');
            getCategories();
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }

    const getCategories = async () => {
        try {
            const response = await getCategory();
            setCategories(response);
            setLoading(false);
        } catch (error) {
            navigate("/login", { state: { message: error.message } });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteCategory(id);
            toast.success(response.message);
            getCategories();
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h1 className="mb-4">Category</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="tabl table-bordered table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td className="py-2 px-3 text-center">{cat.id}</td>
                                <td className="py-2 px-3 text-center">{cat.name}</td>
                                <td className="py-2 px-3 text-center">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="mt-4">
                <form onSubmit={handleForm} className="form-inline">
                    <label htmlFor="categoryName" className="mr-2">Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        className="form-control mr-2"
                        value={newCategoryName}
                        onChange={handleName}
                    />
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    );
}
