"use client";

import ListingsPage from "@/components/listings-page";
import WelcomePage from "@/components/welcome-page";
import React, { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOx41pT-4pciiPz7owccGOa1d0lp4ObjM",
  authDomain: "ticket-tracker-61a63.firebaseapp.com",
  projectId: "ticket-tracker-61a63",
  storageBucket: "ticket-tracker-61a63.appspot.com",
  messagingSenderId: "893361691754",
  appId: "1:893361691754:web:ceaa5a66af984fbfeffe13",
  measurementId: "G-1JP8DVVDEH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Home() {
  const [status, setStatus] = useState("initializing");

  return (
    <div className="h-screen w-screen flex-col items-center justify-between bg-white">
      {status !== "authenticated" && (
        <WelcomePage setStatusCallback={setStatus} />
      )}
      {status === "authenticated" && <ListingsPage />}
    </div>
  );
}
