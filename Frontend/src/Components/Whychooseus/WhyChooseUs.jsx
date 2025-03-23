import React, { useEffect, useState } from "react";
import { FaBolt, FaCogs, FaGlobe, FaShieldAlt, FaClock, FaHeadset } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const features = [
  { title: "Experience You Can Trust", description: "Over 20 years of expertise in logistics and shipping.", icon: <FaBolt size={28} /> },
  { title: "Customized Solutions", description: "Tailored logistics services to meet your specific needs.", icon: <FaCogs size={28} /> },
  { title: "Global Reach", description: "Seamless delivery of your cargo worldwide.", icon: <FaGlobe size={28} /> },
  { title: "Compliance Solutions", description: "Ensuring legal compliance with customs and trade regulations.", icon: <FaShieldAlt size={28} /> },
  { title: "Timely Delivery", description: "On-time shipment delivery with our advanced logistics network.", icon: <FaClock size={28} /> },
  { title: "24/7 Service", description: "Our team is available round-the-clock to serve you.", icon: <FaHeadset size={28} /> },
];

const WhyChooseUs = () => {
  const [primaryColor, setPrimaryColor] = useState('#007bff'); 
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

  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="fw-bold position-relative d-inline-block" style={{ color: primaryColor }}>
          Why Choose Us
        </h2>
        <div className="row mt-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0 p-4 text-center h-100">
                <div className="icon-circle text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                     style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: primaryColor }}>
                  {feature.icon}
                </div>
                <h5 className="fw-semibold" style={{ color: primaryColor }}>{feature.title}</h5>
                <p className="text-muted mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
