import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { getProduct, Delete, getCategory } from "./api";
import { toast } from "react-toastify";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';


export default function ProductSpring() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectcat, setSelectcat] = useState(null);
    const [decode, setDecode] = useState(null);
    const navigate = useNavigate();
    const loc = useLocation();


    useEffect(() => {
        getProducts();
        getCategories();
        Decode();
        if(loc.state){
            toast(loc.state.message);
            loc.state = null;
        }
    }, [loc]); 

    const Decode = () => {
        const token = localStorage.getItem("user");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecode(decoded);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        } else {
            console.log('Token not found');
        }
    };

    const getProducts = async () => {
        try {
            const response = await getProduct();
            setProduct(response);
        } catch (error) {
            console.log("Error fetching products:", error.message);
        }
    };

    const getCategories = async () => {
        try {
            const response = await getCategory();
            setCategory(response);
        } catch (error) {
            navigate("/login", { state: { message: error.message } });
        }
    };

    const handleDelete = async (prodId) => {
        const response= await Delete(prodId);
        navigate("/product", { state: { message: response.product+" deleted"}});
    };

    const handleCategory = (catName) => {
        setSelectcat(catName);
    };

    const products = selectcat
        ? category.find(cat => cat.name === selectcat)?.products || []
        : product;

    return (
        <div>
            <div className="container big">
                <div>
                    {category.map(op => (
                        <button key={op.id} value={op.name} onClick={() => handleCategory(op.name)}>
                            {op.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="container bigdiv">
                {products.map(prod => (
                    <div className="content" key={prod.id}>
                        <div>
                            {prod.image && <img src={require(`./images/${prod.image}`)} alt={prod.name} />}
                            <a href={`/oneproduct/${prod.id}`}><h2>{prod.name}</h2></a>
                            <div className="contss">
                                <div></div>
                            </div>
                            <h4 className="price">{prod.price}</h4>
                            <h4 className="price">{prod.catName}</h4>
                            {
                                decode && decode.role === 'ROLE_ADMIN' && (
                                    <>
                                        <button className="AL" onClick={() => handleDelete(prod.id)}>Delete</button>
                                        <button className="edit_product">
                                            <a href={`/update/${prod.id}`}>Update Product</a>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
