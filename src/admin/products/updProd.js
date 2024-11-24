import React, { useState, useEffect } from "react";
import { db } from "../../auth/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

import Animations from "../../static/animations";

export default function UpdProd() {
    const { productId } = useParams(); // Get the productId from the URL params
    const navigate = useNavigate(); // For navigation after the product is updated

    // State hooks for product form
    const [prodName, setProdName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Get a reference to the product document
                const productRef = doc(db, "Products", productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const productData = productSnap.data();
                    setProdName(productData.prodName);
                    setPrice(productData.price);
                    setCategory(productData.category);
                    setDescription(productData.description);
                    setImage(productData.image);
                    setQuantity(productData.quantity);
                } else {
                    console.error("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product details: ", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get a reference to the product document
            const productRef = doc(db, "Products", productId);

            // Update the product details in Firestore
            await updateDoc(productRef, {
                prodName,
                price: parseFloat(price),
                category,
                description,
                image,
                quantity: parseInt(quantity, 10),
            });

            console.log("Product updated successfully!");
            alert("Product updated successfully!");
            navigate("/viewProd"); // Redirect to the product listing page after update
        } catch (error) {
            console.error("Error updating product: ", error);
            alert("Error updating product!");
        }
    };

    return (
        <Animations>
            <div className="adm_container">
                <div className="adm_div">
                    <h1 className="adm_title">Update Product</h1>
                    <form className="adm_form" onSubmit={handleSubmit}>
                        <label className="adm_label" htmlFor="prodName">
                            Product Name
                        </label>
                        <input
                            className="adm_inp"
                            type="text"
                            id="prodName"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            required
                        />

                        <label className="adm_label" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="adm_inp"
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                        <label className="adm_label" htmlFor="category">
                            Category
                        </label>
                        <input
                            className="adm_inp"
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />

                        <label className="adm_label" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="adm_inp"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>

                        <label className="adm_label" htmlFor="image">
                            Product Image URL
                        </label>
                        <input
                            className="adm_inp"
                            type="url"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />

                        <label className="adm_label" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            className="adm_inp"
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <button className="adm_btn" type="submit">
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </Animations>
    );
}
