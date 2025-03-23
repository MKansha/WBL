import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Servicepage from '../Components/Services/Servicepage'
import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceSection from '../Components/Services/ServiceSection';
import ContactFormModal from '../Components/Contact/ContactFormModal';

const Services = () => {
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
    <Servicepage color={primaryColor}/>
    <ServiceSection color={primaryColor}/>
   
    <Footer/>
    <ContactFormModal show={showModal} handleClose={() => setShowModal(false)} color={primaryColor}/>

    </>
  )
}

export default Services