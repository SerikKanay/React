import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { saveProduct, getCategory } from "./api";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

export default function CreateJava() {
    const [prod, setProd] = useState({
        name: '',
        image: null,
        price: 0,
        category: ''
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const loc = useLocation();
    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await getCategory();
                setCategory(response);
            } catch (error) {
                navigate("/login",{state:{message:error.message}});
            }
        }
        getCategories();
    }, []);
    useEffect(() => {
        if(loc.state){
            toast(loc.state.message);
            loc.state = null;
        }
    }, [loc]); 


    const handleName = (ev) => {
        setProd({ ...prod, name: ev.target.value });
    }
    const handleImage = (ev) => {
        setProd({ ...prod, image: ev.target.files[0] });
    }
    const handlePrice = (ev) => {
        setProd({ ...prod, price: ev.target.value });
    }
    const handleSelect = (ev) => {
        setProd({ ...prod, category: parseInt(ev.target.value) });
    }

    const handleForm = async (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', prod.name);
        formData.append('price', prod.price);
        formData.append('category', prod.category);
        formData.append('image', prod.image);
        try {
            const response = await saveProduct(formData); 
            navigate("/addproduct",{state:{message:"Товар Қосылды:"+response}});
            window.location.reload();
        } catch (error) {
            console.log("Error:", error);
       }
    }


    return (
        <div className="container mt-5">
        <form onSubmit={handleForm} className="bg-light p-4 rounded shadow-sm">
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleImage}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Name:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={prod.name}
                    onChange={handleName}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="1"
                    className="form-control"
                    value={prod.price}
                    onChange={handlePrice}
                    required
                    placeholder="$"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category:</label>
                <select
                    name="category"
                    value={prod.category}
                    onChange={handleSelect}
                    className="form-select"
                    required
                >
                    <option value="">Select Category</option>
                    {category.map((op) => (
                        <option key={op.id} value={op.id}>{op.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
    </div>

    );
}
