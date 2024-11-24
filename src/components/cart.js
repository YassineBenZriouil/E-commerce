import React, { useState, useEffect } from "react";
import {
    getFirestore,
    doc,
    collection,
    setDoc,
    getDoc,
    query,
    getDocs,
    where,
    arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../style/cart.css";
import { Link } from "react-router-dom";
import { p } from "framer-motion/client";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleCheckboxChange = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const calculateTotal = (products) => {
        const total = products.reduce((sum, product) => sum + product.price, 0);
        setTotalAmount(total);
    };

    const handleCommandAll = async () => {
        try {
            calculateTotal(cart); // Calculate total for all products
            await saveOrder(cart.map((product) => product.id)); // Use all product IDs
            setSelectedProducts([]); // Clear selection
        } catch (error) {
            console.error("Error ordering all:", error);
            alert("Failed to order all products. Please try again.");
        }
    };

    const handleCommandSelected = async () => {
        try {
            const selected = cart.filter((product) =>
                selectedProducts.includes(product.id)
            );
            calculateTotal(selected); // Calculate total for selected products
            await saveOrder(selectedProducts); // Save only selected product IDs
            setSelectedProducts([]); // Clear selection
        } catch (error) {
            console.error("Error ordering selected:", error);
            alert("Failed to order selected products. Please try again.");
        }
    };

    const removeOrderedProductsFromLocalStorage = (orderedProductIds) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = storedCart.filter(
            (product) => !orderedProductIds.includes(product.id)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const saveOrder = async (productIds) => {
        try {
            const userEmail = localStorage.getItem("loggedInUser");

            const usersCollection = collection(db, "Users");
            const q = query(usersCollection, where("email", "==", userEmail));
            const userSnapshot = await getDocs(q);

            if (userSnapshot.empty) {
                alert("User not found in Firebase.");
                return;
            }

            const userId = userSnapshot.docs[0].id;
            const userOrderDoc = doc(db, "orders", userId);

            const userOrderSnapshot = await getDoc(userOrderDoc);
            if (userOrderSnapshot.exists()) {
                await setDoc(
                    userOrderDoc,
                    {
                        orders: arrayUnion(
                            ...productIds.map((id) => doc(db, "Products", id))
                        ),
                    },
                    { merge: true }
                );
            } else {
                await setDoc(userOrderDoc, {
                    orders: productIds.map((id) => doc(db, "Products", id)),
                    userRef: doc(db, "Users", userId),
                });
            }

            removeOrderedProductsFromLocalStorage(productIds);
            alert("Order saved successfully!");
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Failed to save the order. Please try again.");
        }
    };

    const loginIfNotLogedin = () => (
        <div>
            <h3>Please Log In First </h3>
            <Link to="/login">
                <button className="view_details">Login</button>
            </Link>
        </div>
    );

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Product Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(
                                                product.id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(product.id)
                                            }
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price} DH</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-actions">
                        <button
                            className="view_details"
                            onClick={handleCommandAll}
                        >
                            Order <br /> All
                        </button>
                        <button
                            className="view_details"
                            onClick={handleCommandSelected}
                        >
                            Order <br /> Selected
                        </button>
                    </div>
                    <div className="total-amount">
                        <h3>Total Amount: {totalAmount} DH</h3>
                    </div>
                </>
            ) : (
                <p>No products in the cart.</p>
            )}
        </div>
    );
}
