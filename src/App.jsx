import { Fragment, useEffect, useState } from 'react';
import Header from './Components/Common/Header/Header';
import Footer from './Components/Common/Footer/Footer';
import HomePage from './Pages/HomePage';
import ConsentPopup from './Components/Common/ConsentPopup/ConsentPopup';
import Chatbot from './Components/Common/Chatbot/Chatbot';
import Thankyou from './Components/ThankYouPage/Thankyou';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import { initHomePageScripts } from './Utils/scripts';

export default function App() {
  const location = useLocation();

  useEffect(() => { 
    const cleanup = initHomePageScripts();
    return cleanup;
  }, []);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ConsentPopup />
      {location.pathname !== '/thank-you' && <Chatbot />}
    </Fragment>
  );
}
