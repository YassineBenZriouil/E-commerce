import React from "react";
import "../style/footer.css";

import { Link } from "react-router-dom";

import Theme from "../theme/themeProvider";

export default function Footer(props) {
    return (
        <>
            <div className="footer_container">
                <Link className="footer_link" to="/">
                    {props.company.toUpperCase()}
                </Link>{" "}
                <p className="footer_text">
                    © {props.company.toUpperCase()} {new Date().getFullYear()}{" "}
                    All rights reserved.
                </p>
                <Theme />
            </div>
        </>
    );
}
