import React, { useEffect, useState } from 'react';
// import AppRoutes from './routes/AppRoutes';
import './App.css';
import './styles/bootstrap-icons.css';
import './styles/bootstrap.min.css';
import './styles/magnific-popup.css';
import './styles/tooplate-clean-work.css'
// import './App.css';
import AppRoutes from './routes/AppRoutes';
import Header from './components/header';
import NavBar from './components/navBar';
import Footer from './components/footer';
import Preloader from './components/preloader';

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulez provisoirement un délai de chargement 
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 secondes

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? <Preloader /> : <>
        {/* <Header />
        <NavBar /> */}
        <AppRoutes />
        <Footer />
      </>}
    </>
  );
};
