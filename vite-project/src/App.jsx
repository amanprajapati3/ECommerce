import React, { useEffect } from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); 
  }, []);

  return (
    <>
      <Header />

      
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>

      <Footer />
    </>
  );
};

export default App;
