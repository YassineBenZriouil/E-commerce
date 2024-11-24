import React from "react";
import "../style/about.css";

const AboutUs = (props) => {
    return (
        <div className="about-us-container">
            <h1 className="about-title">Welcome to {props.company}!</h1>
            <p className="about-description">
                At <strong>{props.company}</strong>, we’re redefining online
                shopping by providing a seamless, user-friendly experience for
                both buyers and sellers. Whether you're looking for the latest
                gadgets, trendy fashion, or daily essentials, {props.company} is
                your one-stop destination.
            </p>

            <section className="what-sets-us-apart">
                <h2>What Sets Us Apart?</h2>
                <ul>
                    <li>
                        🛒 <strong>Dynamic Shopping Experience:</strong>{" "}
                        Intuitive and responsive design for browsing on any
                        device.
                    </li>
                    <li>
                        🛡️ <strong>Safe & Secure Transactions:</strong>{" "}
                        State-of-the-art authentication and security measures.
                    </li>
                    <li>
                        🌐 <strong>Community Focus:</strong> More than just a
                        store—we're a community connecting customers with
                        trusted sellers.
                    </li>
                    <li>
                        🎨 <strong>Personalized Touch:</strong> Theme selection
                        and tailored recommendations just for you.
                    </li>
                </ul>
            </section>

            <section className="features">
                <h2>Features You'll Love</h2>
                <div className="features-grid">
                    <div className="feature">
                        <h3>For Shoppers</h3>
                        <ul>
                            <li>
                                Add items to your cart and checkout with ease.
                            </li>
                            <li>
                                Access detailed product descriptions, reviews,
                                and ratings.
                            </li>
                            <li>Enjoy regular discounts and flash sales.</li>
                        </ul>
                    </div>
                    <div className="feature">
                        <h3>For Admins</h3>
                        <ul>
                            <li>
                                Simplified product management with full CRUD
                                capabilities.
                            </li>
                            <li>
                                Detailed order management system for tracking
                                and fulfilling customer needs.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mission-vision">
                <h2>Our Mission</h2>
                <p>
                    To create an e-commerce platform that’s accessible,
                    efficient, and enjoyable for everyone. Whether you’re a
                    seller managing your inventory or a shopper discovering the
                    perfect item, we’re here to make it happen.
                </p>
                <h2>Vision</h2>
                <p>
                    {props.company} aims to become Morocco's leading e-commerce
                    platform, catering to local needs with a global perspective.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
