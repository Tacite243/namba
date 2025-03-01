"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "@/styles/globals.css";

const SpinnerClient = () => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  if (!isLoading) return null;

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default SpinnerClient;
