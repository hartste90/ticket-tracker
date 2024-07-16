"use client";

import ListingsPage from "@/components/listings-page";
import WelcomePage from "@/components/welcome-page";
import Image from "next/image";
import React from "react";
import { useState } from "react";

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
