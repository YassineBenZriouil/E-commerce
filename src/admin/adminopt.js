import React from "react";
import { Link } from "react-router-dom";
import Animations from "../static/animations";

import "../style/adm.css";

export default function AdminPanel() {
    return (
        <Animations>
            <div className="adm_container">
                <div className="adm_div">
                    <h1 className="adm_title">Admin Panel</h1>
                    <div className="btns_div">
                        <Link className="adm_link" to="/addProd">
                            <button className="adm_btn">Add Product </button>
                        </Link>
                        <Link className="adm_link" to="/viewProd">
                            <button className="adm_btn">View All </button>
                        </Link>{" "}
                    </div>
                </div>
            </div>
        </Animations>
    );
}
