import { useState, useEffect } from "react";
import { getOneProd } from "./api";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"; // Ensure you have some custom styles if needed

export default function OneProduct() {
    const params = useParams();
    const [prod, setProd] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getOneProd(params.prodId);
                if (product) {
                    setProd(product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (params.prodId) {
            fetchData();
        }
    }, [params.prodId]);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="row g-0">
                    <div className="col-md-4">
                        {prod.image && (
                            <img
                            src={require(`./images/${prod.image}`)}
                                className="img-fluid rounded-start"
                                alt={prod.name}
                            />
                        )}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{prod.name}</h2>
                            <p className="card-text"><strong>Price:</strong> ${prod.price}</p>
                            <p className="card-text"><strong>Category:</strong> {prod.catName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
