import React, { useState, useEffect } from "react";
import { db } from "../../auth/firebase";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";

import { Link } from "react-router-dom";
import "./../../style/adm.css";

export default function ViewProd() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = collection(db, "Products");
                const unsubscribe = onSnapshot(productsRef, (snapshot) => {
                    const productsList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setProducts(productsList);
                });

                // Cleanup on unmount
                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const productRef = doc(db, "Products", productId);
            await deleteDoc(productRef);
            setProducts(products.filter((product) => product.id !== productId));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product: ", error);
            alert("Error deleting product!");
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.prodName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="adm_container">
            <div className="adm_div">
                <h1 className="adm_title">Manage Products</h1>

                <input
                    type="text"
                    className="search_input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                {filteredProducts.length === 0 ? (
                    <p className="adm_text">No products found.</p>
                ) : (
                    <table className="adm_table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price ($)</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.prodName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button
                                            className="adm_btn"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                        <Link to={`/updProd/${product.id}`}>
                                            <button className="adm_btn">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
