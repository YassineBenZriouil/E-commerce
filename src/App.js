import React from "react";
import "./style/App.css";

import Header from "./static/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Footer from "./static/footer";

import Register from "./auth/register";
import Login from "./auth/login";
import Profile from "./auth/profile";
import AdminPanel from "./admin/adminopt";

import AddProd from "./admin/products/addProd";
import UpdProd from "./admin/products/updProd";
import ViewProd from "./admin/products/viewProd";
import Prodetails from "./components/prodetails";
import Cart from "./components/cart";

import Orders from "./components/orders";
import About from "./components/about";

export default function App() {
    const COMPANY = process.env.REACT_APP_COMPANY_NAME;

    return (
        <>
            <Router>
                <Header company={COMPANY} />
                <div className="App">
                    <Routes>
                        {/* Pass the company prop to the About component */}
                        <Route
                            path="/about"
                            element={<About company={COMPANY} />}
                        />
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/adminopt" element={<AdminPanel />} />
                        <Route path="/addProd" element={<AddProd />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route
                            path="/updProd/:productId"
                            element={<UpdProd />}
                        />
                        <Route
                            path="/prodetails/:productId"
                            element={<Prodetails />}
                        />
                        <Route path="/viewProd" element={<ViewProd />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
                <Footer company={COMPANY} />
            </Router>
        </>
    );
}
