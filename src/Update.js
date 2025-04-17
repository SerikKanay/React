import { useState,useEffect  } from "react";
import { getOneProd,Update,getCategory } from "./api";
import 'react-notifications/lib/notifications.css';
import {useParams,useNavigate} from "react-router-dom";

export default function Edit(){
    const params = useParams();
    const [category, setCategory] = useState([]);
    console.log("category:"+category.name)
    const navigate =useNavigate();
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
        const fetchData = async () => {
            try {
                const product = await getOneProd(params.prodId);
                if (product) {
                    setProd(product);
                }
            } catch (error) {
                console.error("Error product:", error);
            }
        };

        if (params.prodId) {
            fetchData();
        }
    }, [params.prodId]);
    

    const[prod,setProd]=useState({
        name: '',
        price:0,
        category:''
    });
    const handleName =(ev)=>{
        setProd({...prod,name: ev.target.value});
    }
    const handlePrice =(ev)=>{
        setProd({...prod,price: ev.target.value});
    }
    const Select =(ev)=>{
        setProd({...prod,category:ev.target.value});
        console.log(ev.target);
    }  

    const handleForm= async(ev)=>{
        ev.preventDefault();
        try {
            const update = await Update(prod);
            navigate("/product",{ state:{message:"Update : "+update.name,title:"Update!!!"}});
        } catch (error) {
            navigate("/login",{state:{message:error.message}});
        }
    }

    return (
        <div>
            <form onSubmit={handleForm}>
            {prod.image && <img src={require(`./images/${prod.image}`)} alt="a" />}
                Name:<input id="name" type="text" value={prod.name} onChange={handleName}/><br/>
                price:<input id="price" type="number" value={prod.price} onChange={handlePrice}/>
                <select id="category" value={prod.category} onChange={Select}>
                <option value="">Select Category</option>
                 {
                    category.map((op)=>{
                        return(
                            <option key={op.id} value={op.id}>{op.name}</option>
                        )
                    })
                 }
            
                </select>
                <button type="submit">
                    Update
                </button>
            </form>
        </div>
    )
 }