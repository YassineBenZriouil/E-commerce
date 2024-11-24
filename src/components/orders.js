import React, { useState, useEffect } from "react";
import {
    getFirestore,
    doc,
    getDocs,
    query,
    collection,
    where,
} from "firebase/firestore";
import "../style/orders.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userEmail = localStorage.getItem("loggedInUser");
                if (!userEmail) {
                    alert("No logged-in user found.");
                    setLoading(false);
                    return;
                }

                // Fetch the user document reference based on the email
                const usersCollection = collection(db, "Users");
                const userQuery = query(
                    usersCollection,
                    where("email", "==", userEmail)
                );
                const userSnapshot = await getDocs(userQuery);

                if (userSnapshot.empty) {
                    alert("User not found.");
                    setLoading(false);
                    return;
                }

                const userDoc = userSnapshot.docs[0];
                const userRef = userDoc.ref;

                // Fetch orders using the user reference
                const ordersCollection = collection(db, "orders");
                const ordersQuery = query(
                    ordersCollection,
                    where("userRef", "==", userRef)
                );
                const ordersSnapshot = await getDocs(ordersQuery);

                if (ordersSnapshot.empty) {
                    alert("No orders found for this user.");
                } else {
                    const fetchedOrders = [];
                    for (const orderDoc of ordersSnapshot.docs) {
                        const orderData = orderDoc.data();
                        const productRefs = orderData.orders || []; // Array of product references
                        const status = orderData.status || "Pending";

                        // Resolve each product reference
                        for (const productRef of productRefs) {
                            const productSnapshot = await productRef.get();
                            if (productSnapshot.exists()) {
                                const productData = productSnapshot.data();
                                fetchedOrders.push({
                                    name: productData.name, // Assuming `name` is a field in Products
                                    status,
                                });
                            } else {
                                console.warn(
                                    "Product not found for reference:",
                                    productRef
                                );
                            }
                        }
                    }
                    setOrders(fetchedOrders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                alert("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [db]);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.name}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}
