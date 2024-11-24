import React, { useState, useEffect } from "react";
import { db } from "../auth/firebase";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import "../style/home.css";
import Carousel from "./carousel";
import Loading from "../static/loading";
import ProdCard from "./prodcard";
import Animations from "../static/animations";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                // Fetch categories
                const categoriesRef = collection(db, "Categories");
                const unsubscribeCategories = onSnapshot(
                    categoriesRef,
                    (snapshot) => {
                        const categoriesList = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            name: doc.data().name,
                        }));
                        setCategories([
                            { id: "all", name: "All" },
                            ...categoriesList,
                        ]);
                    }
                );

                // Fetch products
                const productsRef = collection(db, "Products");
                const unsubscribeProducts = onSnapshot(
                    productsRef,
                    async (snapshot) => {
                        const productsList = await Promise.all(
                            snapshot.docs.map(async (productDoc) => {
                                const productData = productDoc.data();
                                const categoryRef = productData.category;

                                // Resolve category reference to category name
                                let categoryName = "Uncategorized";
                                if (categoryRef) {
                                    const categoryDoc = await getDoc(
                                        doc(db, categoryRef.path)
                                    );
                                    if (categoryDoc.exists()) {
                                        categoryName = categoryDoc.data().name;
                                    }
                                }

                                return {
                                    id: productDoc.id,
                                    ...productData,
                                    categoryName,
                                };
                            })
                        );

                        setProducts(productsList);
                        setLoading(false);
                    }
                );

                return () => {
                    unsubscribeCategories();
                    unsubscribeProducts();
                };
            } catch (error) {
                console.error("Error fetching categories and products:", error);
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    // Filter products by category and search query
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.categoryName === selectedCategory;
        const matchesSearchQuery = product.prodName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    return (
        <Animations>
            <div className="home-container">
                <div className="wecome_categories">
                    <div className="categories_container">
                        <select
                            name="category"
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value="">CATEGOTRY</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="search_bar">
                        <input
                            type="text"
                            className="search_input"
                            placeholder="Search For Item's Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </span>
                </div>

                <div className="categories_product">
                    <div className="carousel_product">
                        <div>
                            <Carousel />
                        </div>
                        <div className="products_div">
                            {loading ? (
                                <Loading />
                            ) : filteredProducts.length === 0 ? (
                                <p>
                                    No products found. Try another search or
                                    select a different category.
                                </p>
                            ) : (
                                filteredProducts.map((product) => (
                                    <ProdCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Animations>
    );
}
