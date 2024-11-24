import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPuR0t4$B3KhPU8m0uXrTSmgIXUZ_Kl0",
    authDomain: "e-commerce-81a25.firebaseapp.com",
    projectId: "e-commerce-81a25",
    storageBucket: "e-commerce-81a25.firebasestorage.app",
    messagingSenderId: "954308995182",
    appId: "1:954308995182:web:b6788301c20ca2afc1de7f",
    measurementId: "G-BYFZ4QNT33",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

export { auth, db, app };
