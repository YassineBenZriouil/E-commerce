import React, { useState } from "react";
import { auth, db } from "./firebase";

import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import Animations from "./../static/animations";

import "../style/auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            localStorage.setItem("loggedInUser", email);
            navigate("/");
            if (email === "admin@admin.com" && password === "adminadmin") {
                console.log("Admin logged in successfully");
                localStorage.setItem("loggedInUser", email);
                alert("Admin logged in successfully");
                navigate("/adminopt");
            } else {
                alert("User logged in successfully");
            }
        } catch {
            console.error("User login failed");
            alert("User login failed");
        }
    };

    return (
        <Animations>
            <div className="auth_container">
                <div className="auth_div">
                    <h1 className="auth_title">LOGIN</h1>
                    <form className="auth_form" onSubmit={handleSubmit}>
                        <label className="auth_label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="auth_inp"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="auth_label" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="auth_inp"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="auth_btn" type="submit">
                            Log in
                        </button>
                        <p className="auth_question">
                            Don't have an account?{" "}
                            <Link className="auth_link" to="/register">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </Animations>
    );
}
