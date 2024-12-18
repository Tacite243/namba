import React from 'react';
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

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
      <AppRoutes />
      <Footer />
    </>
  );
};
