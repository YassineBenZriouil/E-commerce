import React, { useState } from "react";
import { auth, db } from "./firebase";

import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import "../style/auth.css";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [islogedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("User created successfully:", user);
            setIsLoggedIn(true);

            await setDoc(doc(db, "Users", user.uid), {
                userName,
                email,
            });
            console.log("User data stored in Firestore");

            alert("User registered successfully");

            navigate("/login"); // Redirect after successful registration
        } catch (error) {
            console.error("User registration failed:", error.message);

            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use , please use another email");
            } else {
                alert("User registration failed");
            }
        }
    };

    return (
        <div className="auth_container">
            <div className="auth_div">
                <h1 className="auth_title">REGISTER</h1>
                <form className="auth_form" onSubmit={handleSubmit}>
                    <label className="auth_label" htmlFor="userName">
                        User Name
                    </label>
                    <input
                        className="auth_inp"
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <label className="auth_label" htmlFor="email">
                        Email
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
                        Password
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
                        REGISTER
                    </button>
                    <p className="auth_question">
                        Already have an account?{" "}
                        <Link className="auth_link" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
