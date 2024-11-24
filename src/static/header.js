import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../style/header.css";

export default function Header(props) {
    const [open, setIsOpen] = useState(false);

    const [searchBar, setsearchBar] = useState(false);

    const handleHeaderToggle = () => {
        setIsOpen(!open);
    };

    const handleClick = () => {
        setIsOpen(false);
    };

    const Links = [
        "home",
        "about",
        "cart",
        "profile", // Change "Signup" to "signup"
    ];

    return (
        <>
            <div className="main_Header">
                <Link onClick={handleClick} className="prt_name" to="/">
                    {props.company.toUpperCase()}
                </Link>

                <ul className="norm_list">
                    {Links.map((link) => (
                        <li className="list_item" key={link}>
                            <Link
                                onClick={handleClick}
                                className="react_link"
                                to={
                                    link === "home"
                                        ? "/"
                                        : `/${link.toLowerCase()}`
                                }
                            >
                                {link === "profile" ? (
                                    <i className="fa-solid fa-user"></i>
                                ) : link === "cart" ? (
                                    <i className="fa-solid fa-cart-shopping"></i>
                                ) : (
                                    link.toUpperCase()
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button className="brg_btn" onClick={handleHeaderToggle}>
                    ☰
                </button>
            </div>
            <div className={open ? "sub_nav_open" : "sub_nav_closed"}>
                <ul className="hidden-list">
                    {Links.map((link) => (
                        <li className="list_item" key={link}>
                            <Link
                                onClick={handleClick}
                                className="react_link"
                                to={
                                    link === "home"
                                        ? "/"
                                        : `/${link.toLowerCase()}`
                                }
                            >
                                {link === "profile" ? (
                                    <i className="fa-solid fa-user"></i>
                                ) : link === "cart" ? (
                                    <i className="fa-solid fa-cart-shopping"></i>
                                ) : (
                                    link.toUpperCase()
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
