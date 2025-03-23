import React, { useEffect, useState } from "react";
import { FaSmile, FaHandshake, FaAward, FaTools, FaShieldAlt, FaLightbulb } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const features = [
    { 
      title: "Customer Satisfaction Above All", 
      description: "We prioritize our customers’ needs, always striving to exceed expectations with every service we provide.", 
      icon: <FaSmile size={28} /> // Represents satisfaction and happiness
    },
    { 
      title: "Integrity in Action", 
      description: "We operate with honesty, transparency, and accountability, ensuring trust in every interaction.", 
      icon: <FaHandshake size={28} /> // Represents trust and integrity
    },
    { 
      title: "Commitment to Excellence", 
      description: "We maintain the highest standards of service and professionalism, ensuring top-quality results every time.", 
      icon: <FaAward size={28} /> // Represents excellence and achievement
    },
    { 
      title: "Tailored Solutions", 
      description: "We offer customized logistics services to meet the unique needs of each client, delivering the best outcomes.", 
      icon: <FaTools size={28} /> // Represents customization and problem-solving
    },
    { 
      title: "Safety First", 
      description: "We embrace new technologies and continuously seek ways to improve, providing cutting-edge solutions for our clients.", 
      icon: <FaShieldAlt size={28} /> // Represents protection and safety
    },
    { 
      title: "Innovation and Progress", 
      description: "Our team is available round-the-clock to serve you.", 
      icon: <FaLightbulb size={28} /> // Represents innovation and progress
    },
  ];

const Guideliness = () => {
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
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center">
  <div className="container">
    <h3 className="fw-bold position-relative d-inline-block" style={{ color: primaryColor }}>
      Guidelines That Drive Our Success
    </h3>
  </div>
  <div className="container text-center">
    <p className="fw-semibold">
      At We Believe Logistics, our principles guide every action, ensuring exceptional service, ethical standards, and lasting client relationships.
    </p>
  </div>
</div>
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

export default Guideliness;
