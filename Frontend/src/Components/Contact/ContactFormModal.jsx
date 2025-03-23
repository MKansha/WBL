// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import axios from "axios";
// import "./ContactFormModal.css";

// const ContactFormModal = ({ show, handleClose, color }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     message: "",
//     company_name: "",
//     origin: "",
//     destination: "",
//   });

//   const [sections, setSections] = useState([]); // Stores services from API

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     handleClose();
//   };

//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   // Fetch Services from API
//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/services`)
//       .then((response) => {
//         setSections(response.data); // Store services
//         console.log("services", response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching services:", error);
//       });
//   }, []);

//   return (
//     <Modal show={show} onHide={handleClose} centered  style={{ zIndex: 10100 ,}}>
//       <Modal.Header className="custom-modal-header" style={{ backgroundColor: color, color: "white" ,border:"3px solid white"}} closeButton>
//         <Modal.Title>Get Started Today</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleSubmit}>
//           {/* Name Field */}
//           <div className="mb-3">
//             <label className="form-label">Contact Person Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               placeholder="Enter username"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Email Field */}
//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               placeholder="Enter Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Phone Field */}
//           <div className="mb-3">
//             <label className="form-label">Phone Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Company Name Field */}
//           <div className="mb-3">
//             <label className="form-label">Company Name (Optional)</label>
//             <input
//               type="text"
//               className="form-control"
//               name="company_name"
//               placeholder="Enter Company Name"
//               value={formData.company_name}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Service Dropdown */}
//           <div className="mb-3">
//             <label className="form-label">Type of Service Needed</label>
//             <select
//               className="form-control"
//               name="service"
//               value={formData.service}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a Service</option>
//               {sections.map((section, index) => (
//                 <option key={index} value={section.title}>
//                   {section.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Origin & Destination Fields */}
//           <div className="row mb-3">
//             <div className="col">
//               <label className="form-label">Origin</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="origin"
//                 placeholder="From"
//                 value={formData.origin}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col">
//               <label className="form-label">Destination</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="destination"
//                 placeholder="To"
//                 value={formData.destination}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Message Field */}
//           <div className="mb-3">
//             <label className="form-label">Message</label>
//             <textarea
//               className="form-control"
//               rows="4"
//               name="message"
//               placeholder="Write something"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>

//           {/* Buttons */}
//           <div className="d-flex justify-content-between">
//             <Button variant="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button type="submit" style={{ backgroundColor: color, color: "white" }}>
//               Submit
//             </Button>
//           </div>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ContactFormModal;
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./ContactFormModal.css";

const ContactFormModal = ({ show, handleClose, color }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company_name: "",
    origin: "",
    destination: "",
  });

  const [errors, setErrors] = useState({});
  const [sections, setSections] = useState([]); // Stores services from API
  const [loading, setLoading] = useState(false); // Track request state

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "Invalid name (letters & spaces only)";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits";
        break;
      case "company_name":
        if (value && !/^[a-zA-Z0-9\s]+$/.test(value)) error = "Invalid company name";
        break;
      case "origin":
      case "destination":
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "Only letters & spaces allowed";
        break;
      case "message":
        if (value.length < 10) error = "Message must be at least 10 characters";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.post(`${API_BASE_URL}/inquiries`, formData);

      console.log("Inquiry Submitted:", response.data);
      alert("Inquiry submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        company_name: "",
        origin: "",
        destination: "",
      });

      handleClose();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch Services from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/services`)
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered style={{ zIndex: 10100 }}>
      <Modal.Header
        className="custom-modal-header"
        style={{ backgroundColor: color, color: "white", border: "3px solid white" }}
        closeButton
      >
        <Modal.Title>Get Started Today</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label">Contact Person Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter username"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          {/* Phone Field */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          {/* Company Name Field */}
          <div className="mb-3">
            <label className="form-label">Company Name (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="company_name"
              placeholder="Enter Company Name"
              value={formData.company_name}
              onChange={handleChange}
            />
            {errors.company_name && <small className="text-danger">{errors.company_name}</small>}
          </div>

          {/* Service Dropdown */}
          <div className="mb-3">
            <label className="form-label">Type of Service Needed</label>
            <select
              className="form-control"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a Service</option>
              {sections.map((section, index) => (
                <option key={index} value={section.title}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          {/* Origin & Destination Fields */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Origin</label>
              <input
                type="text"
                className="form-control"
                name="origin"
                placeholder="From"
                value={formData.origin}
                onChange={handleChange}
              />
              {errors.origin && <small className="text-danger">{errors.origin}</small>}
            </div>
            <div className="col">
              <label className="form-label">Destination</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                placeholder="To"
                value={formData.destination}
                onChange={handleChange}
              />
              {errors.destination && <small className="text-danger">{errors.destination}</small>}
            </div>
          </div>

          {/* Message Field */}
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="4"
              name="message"
              placeholder="Write something"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && <small className="text-danger">{errors.message}</small>}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: color, color: "white" }} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactFormModal;
