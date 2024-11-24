// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcvTCB1pqqrQRyGfjW6D-Cwdf3ETgQ-3A",
  authDomain: "finalsfirebase-b3601.firebaseapp.com",
  projectId: "finalsfirebase-b3601",
  storageBucket: "finalsfirebase-b3601.firebasestorage.app",
  messagingSenderId: "489176663229",
  appId: "1:489176663229:web:161bbfe4d785b28195a3d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };