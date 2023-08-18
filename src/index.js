import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDawRyU8oGCMGB7s-A6eHdrq4gw-PF67OY",
  authDomain: "react-chat-app-c9c69.firebaseapp.com",
  databaseURL:
    "https://react-chat-app-c9c69-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-app-c9c69",
  storageBucket: "react-chat-app-c9c69.appspot.com",
  messagingSenderId: "784180240802",
  appId: "1:784180240802:web:6757232da462bf24bbd2fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
