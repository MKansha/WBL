import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import AboutPage from '../Components/AboutPage/AboutPage'
import React, { useEffect, useState } from "react";
import axios from "axios";
import AboutSections from '../Components/AboutPage/AboutSections.jsx';
import Guideliness from '../Components/Guideliness/Guideliness.jsx';
import ContactFormModal from '../Components/Contact/ContactFormModal.jsx';
const About = () => {
    const [primaryColor, setPrimaryColor] = useState("#007bff"); // Default color
    const [showModal, setShowModal] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
    useEffect(() => {
      axios.get(`${API_BASE_URL}/settings`)
        .then((response) => {
          setPrimaryColor(response.data.primary_color);
          console.log("Fetched primary color:", response.data.primary_color);
        })
        .catch((error) => {
          console.error("Error fetching primary color:", error);
        });
    }, []);
  console.log(primaryColor);
  return (
    <>
    <Header setShowModal={setShowModal}/>
    <AboutPage color={primaryColor}/>
    <AboutSections color={primaryColor}/>
    <Guideliness/>
    <Footer/>
    <ContactFormModal show={showModal} handleClose={() => setShowModal(false)} color={primaryColor}/>
    </>
  )
}

export default About