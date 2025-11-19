import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/About";
import Faq from "../Components/Faq";
import Feature from "../Components/Feature";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
function LandingPage() {
  const heroRef = useRef(null);
  const featureRef = useRef(null);
  const aboutRef = useRef(null);
  const faqRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} refs={{ heroRef, featureRef, aboutRef, faqRef }} />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex flex-col gap-10 p-4">
                <div ref={heroRef}><Hero /></div>
                <div ref={featureRef}><Feature /></div>
                <div ref={aboutRef}><About /></div>
                <div ref={faqRef}><Faq /></div>
              </main>
            }
          />

         
        </Routes>
      </div>
 </>
  );
}

export default LandingPage;
