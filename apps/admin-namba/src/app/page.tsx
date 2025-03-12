"use client";
import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { loginUser, registerUser, setAuthenticated } from "@/redux/slices/authSlice";

const AuthPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
      //   } else if (typeof window !== "undefined") {
      //     const storedToken = localStorage.getItem("token");
      //     const storedDate = localStorage.getItem("loginDate");

      //     if (storedToken && storedDate) {
      //       const loginDate = new Date(storedDate);
      //       const now = new Date();
      //       const threeMonths = 90 * 24 * 60 * 60 * 1000;

      //       if (now.getTime() - loginDate.getTime() < threeMonths) {
      //         dispatch(setAuthenticated(true));
      //       }
      //     }
    }
  }, [isAuthenticated, dispatch, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ phoneNumber: formData.phoneNumber, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Connexion" : "Créer un compte"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Nom</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </>
          )}
          <div className="input-group">
            <label>Numéro de téléphone</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? <div className="small-spinner"></div> : isLogin ? "Se connecter" : "Créer un compte"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Créer un compte" : "Se connecter"}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
