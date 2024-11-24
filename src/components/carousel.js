import React, { useState, useEffect } from "react";
import { db } from "../auth/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../style/carousel.css";
import Loading from "../static/loading";
import Animations from "../static/animations";

export default function Carousel() {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Fetch images from Firestore
        const fetchProductsImages = async () => {
            try {
                const productsRef = collection(db, "carousel_images");
                const unsubscribeProducts = onSnapshot(
                    productsRef,
                    (snapshot) => {
                        const imagesList = snapshot.docs.map((doc) => {
                            const productData = doc.data();
                            return productData.url; // Assuming `image` field contains image URL
                        });
                        setImages(imagesList);
                    }
                );

                return () => unsubscribeProducts(); // Cleanup listener
            } catch (error) {
                console.error("Error fetching product images: ", error);
            }
        };

        fetchProductsImages();
    }, []);

    // Change image every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                images.length > 0 ? (prevIndex + 1) % images.length : 0
            );
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [images]);

    return (
        <Animations>
            <div className="carousel_container">
                {images.length > 0 ? (
                    <div className="carousel">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Product ${currentImageIndex + 1}`}
                            className="carousel_image"
                        />
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </Animations>
    );
}
