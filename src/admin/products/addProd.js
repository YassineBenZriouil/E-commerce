import React, { useState, useEffect } from "react";
import { db } from "../../auth/firebase";
import { doc, collection, getDocs, addDoc } from "firebase/firestore";
import "../../style/adm.css";

import Animations from "../../static/animations";

export default function AddProd() {
    const [prodName, setProdName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categories, setCategories] = useState([]);

    const setAlltoNull = () => {
        setProdName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImage("");
        setQuantity("");
    };

    useEffect(() => {
        const getCategories = async () => {
            const categoriesRef = collection(db, "Categories");
            const categoriesSnapshot = await getDocs(categoriesRef);
            const categoriesList = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setCategories(categoriesList);
        };

        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productsRef = collection(db, "Products");

            const categoryRef = doc(db, "Categories", category);

            const productData = {
                prodName,
                price: parseFloat(price),
                category: categoryRef,
                description,
                image,
                quantity: parseInt(quantity, 10),
            };

            await addDoc(productsRef, productData);

            console.log("Product successfully added to Firestore!");
            alert("Product successfully added to Firestore!");
            setAlltoNull();
        } catch (error) {
            console.error("Error adding product to Firestore:", error);
            alert("Error adding product to Firestore!");
        }
    };

    return (
        <Animations>
            <div className="adm_container">
                <div className="adm_div">
                    <h1 className="adm_title">Add a Product</h1>
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
                        <select
                            className="adm_inp"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

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
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </Animations>
    );
}
