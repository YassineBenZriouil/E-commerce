/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import Register from "./register";
import Logout from "./sett&logout";

import Animations from "../static/animations";

export default function Profile() {
    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem("loggedInUser")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedInUser(localStorage.getItem("loggedInUser"));
        };
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return <Animations>{loggedInUser ? <Logout /> : <Register />}</Animations>;
}
