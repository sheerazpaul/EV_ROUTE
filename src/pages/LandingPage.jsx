import React, { useRef, useContext } from "react";
import About from "../Components/About";
import Faq from "../Components/Faq";
import Feature from "../Components/Feature";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import { ThemeContext } from "../Components/ThemeContext";

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
  const { dark } = useContext(ThemeContext);

  return (
    <div className="bg-white dark:bg-[#101922] text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <Navbar scrollToSection={scrollToSection} refs={{ heroRef, featureRef, aboutRef, faqRef }} />
      
      <main className="flex flex-col gap-10 p-4 pt-20">
        <div ref={heroRef}><Hero /></div>
        <div ref={featureRef}><Feature /></div>
        <div ref={aboutRef}><About /></div>
        <div ref={faqRef}><Faq /></div>
      </main>
    </div>
  );
}

export default LandingPage;
