import React, { useState, useEffect } from "react";
import { db } from "../auth/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "../style/prodetails.css";
import Animations from "../static/animations";
export default function Prodetails() {
    const { productId } = useParams(); // Get the productId from the URL params

    const [productDetails, setProductDetails] = useState({
        prodName: "",
        price: "",
        category: null, // Initially null for document reference
        description: "",
        image: "",
        quantity: "",
    });

    const addProdToStorage = () => {
        const loggedInuser = localStorage.getItem("loggedInUser");

        // If no logged in user, show a sign-in alert
        if (!loggedInuser) {
            alert("Please sign in to add products to the cart.");
            return; // Stop further execution if no user is logged in
        }

        // Get the existing cart from localStorage or initialize it as an empty array
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product is already in the cart
        const productExists = cart.some((item) => item.id === productId);
        if (productExists) {
            alert("Product already in cart!");
            return; // Stop further execution if product already in cart
        }

        // Add the new product to the cart
        const newProduct = {
            id: productId, // You can include more fields if needed
            name: productDetails.prodName,
            price: productDetails.price,
        };

        cart.push(newProduct);
        localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart in localStorage
        alert("Product added to cart!");
    };

    const [categoryName, setCategoryName] = useState(""); // Store category name

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productRef = doc(db, "Products", productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const productData = productSnap.data();
                    setProductDetails(productData);

                    // If category is a document reference, fetch it
                    if (productData.category) {
                        const categorySnap = await getDoc(productData.category);
                        if (categorySnap.exists()) {
                            setCategoryName(
                                categorySnap.data().name || "Uncategorized"
                            );
                        }
                    }
                } else {
                    console.error("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product details: ", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    return (
        <Animations>
            <div className="product_details_container">
                <div className="product_card">
                    {" "}
                    {productDetails.image && (
                        <img
                            src={productDetails.image}
                            alt={productDetails.prodName}
                            className="product_image"
                        />
                    )}
                    <div className="product_info">
                        <h1 className="product-name">
                            {productDetails.prodName.toUpperCase()}
                        </h1>
                        <p>Price : {productDetails.price} DH</p>
                        <p>Category : {categoryName || "Loading..."}</p>
                        <p className="product-field">
                            In Stock : {productDetails.quantity}
                        </p>
                        <p className="product-field">
                            Description : {productDetails.description}
                        </p>
                        <button
                            onClick={() => addProdToStorage()}
                            className="addToCart"
                        >
                            TO CART
                        </button>
                    </div>
                </div>{" "}
            </div>
        </Animations>
    );
}
