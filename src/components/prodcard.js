import React from "react";
import { Link } from "react-router-dom";
import Animations from "../static/animations";
import "../style/prodcard.css";
export default function ProdCard({ product }) {
    return (
        <Animations>
            <div className="product-card">
                <img
                    src={product.image}
                    alt={product.prodName}
                    className="product_image"
                />
                <h3 className="product-name">
                    {product.prodName.toUpperCase()}
                </h3>
                <p className="product-price">{product.price} DH</p>
                <Link to={`/prodetails/${product.id}`} className="view_details">
                    DETAILS
                </Link>
            </div>
        </Animations>
    );
}
