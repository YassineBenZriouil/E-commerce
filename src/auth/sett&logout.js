import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import Animations from "./../static/animations";

export default function Logout(props) {
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();
    const [isadmin, setIsadmin] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("cart");
        alert("User logged out successfully");
        navigate("/register");
    };

    const fetchUserDetails = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "Users", user.uid); // Correct the typo
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        });
    };

    useEffect(() => {
        fetchUserDetails();
        checkAdmin();
    }, []);

    const checkAdmin = () => {
        if (localStorage.getItem("loggedInUser") === "admin@admin.com") {
            setIsadmin(true);
        }
    };

    const handelpanel = () => {
        navigate("/adminopt");
    };

    return (
        <Animations>
            <div className="auth_container">
                <div className="auth_div">
                    <h3 className="auth_title">Welcome to {props.company}</h3>
                    <h5 className="auth_label">
                        {userDetails.userName || "Guest"}
                    </h5>
                    <p className="auth_label">
                        Email: {userDetails.email || "No email found"}
                    </p>
                    <button className="auth_btn" onClick={handleLogout}>
                        Logout
                    </button>{" "}
                    {isadmin ? (
                        <button className="auth_btn" onClick={handelpanel}>
                            Panel
                        </button>
                    ) : null}
                </div>
            </div>
        </Animations>
    );
}
