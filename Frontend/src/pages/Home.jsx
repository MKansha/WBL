import React, { useEffect, useState } from "react";
import { useLoader } from "../Context/LoaderContext"; // Import LoaderContext
import Header from "../Components/Header/Header";
import Practice from "../Components/Carousal/Practice";
import WhyChooseUs from "../Components/Whychooseus/WhyChooseUs";
import axios from "axios";
import ShipmentControl from "../Components/ShipmentControl/ShipmentControl";
import HomeContact from "../Components/HomeContact/HomeContact";
import Testimonials from "../Components/Testimonal/Testimonals";
import Footer from "../Components/Footer/Footer";
import ContactFormModal from "../Components/Contact/ContactFormModal";
import ServicesSlider from "../Components/Services/ServicesSlider";
import TruckLoader from "../Loader/TruckLoader";
import Clients from "../Components/Clients/Clients";

const Home = () => {
  const { loading, setLoading } = useLoader();
  const [primaryColor, setPrimaryColor] = useState("#007bff");
  const [showModal, setShowModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState({
    settings: false,
    services: false,
    testimonials: false,
  });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    console.log("Fetching API data...");

    axios.get(`${API_BASE_URL}/settings`)
      .then((response) => {
        setPrimaryColor(response.data.primary_color);
        setDataLoaded((prev) => ({ ...prev, settings: true }));
        console.log("Settings loaded ✅");
      })
      .catch((error) => console.error("Error fetching settings:", error));

    axios.get(`${API_BASE_URL}/services`)
      .then(() => {
        setDataLoaded((prev) => ({ ...prev, services: true }));
        console.log("Services loaded ✅");
      })
      .catch((error) => console.error("Error fetching services:", error));

    axios.get(`${API_BASE_URL}/testimonials`)
      .then(() => {
        setDataLoaded((prev) => ({ ...prev, testimonials: true }));
        console.log("Testimonials loaded ✅");
      })
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  useEffect(() => {
    console.log("Current Data Loaded State:", dataLoaded);

    if (dataLoaded.settings && dataLoaded.services && dataLoaded.testimonials) {
      console.log("All data is loaded! Hiding loader...");
      setLoading(false);
    }
  }, [dataLoaded, setLoading]);

  return (
    <>
      {/* Loader - Full Screen */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          <TruckLoader />
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <div>
          <Header setShowModal={setShowModal} />
          <Practice setShowModal={setShowModal} />
          <WhyChooseUs />
          <ShipmentControl color={primaryColor} />
          <HomeContact color={primaryColor} />
          <ServicesSlider color={primaryColor} />
          <Clients color={primaryColor}/>
          <Testimonials color={primaryColor} />
          <Footer color={primaryColor} />
          <ContactFormModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            color={primaryColor}
          />
        </div>
      )}
    </>
  );
};

export default Home;



// import React, { useEffect, useState } from "react";
// import { useLoader } from "../Context/LoaderContext"; // Import LoaderContext
// import Header from "../Components/Header/Header";
// import Practice from "../Components/Carousal/Practice";
// import WhyChooseUs from "../Components/Whychooseus/WhyChooseUs";
// import axios from "axios";
// import ShipmentControl from "../Components/ShipmentControl/ShipmentControl";
// import HomeContact from "../Components/HomeContact/HomeContact";
// import Testimonials from "../Components/Testimonal/Testimonals";
// import Footer from "../Components/Footer/Footer";
// import ContactFormModal from "../Components/Contact/ContactFormModal";
// import ServicesSlider from "../Components/Services/ServicesSlider";
// import TruckLoader from "../Loader/TruckLoader";
// import Clients from "../Components/Clients/Clients";

// const Home = () => {
//   const { loading, setLoading } = useLoader();
//   const [primaryColor, setPrimaryColor] = useState("#007bff");
//   const [showModal, setShowModal] = useState(false);

//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     console.log("Fetching API data...");
    
//     // Fetching Services
//     axios.get(`${API_BASE_URL}/services`)
//       .then(() => console.log("Services loaded ✅"))
//       .catch((error) => console.error("Error fetching services:", error));

//     // Fetching Testimonials
//     axios.get(`${API_BASE_URL}/testimonials`)
//       .then(() => console.log("Testimonials loaded ✅"))
//       .catch((error) => console.error("Error fetching testimonials:", error));
//       axios.get(`${API_BASE_URL}/settings`)
//             .then((response) => {
//               setPrimaryColor(response.data.primary_color);
//             })
//             .catch((error) => console.error("Error fetching settings:", error));
//     // Hide loader immediately after API calls
//     setLoading(false);
//   }, [setLoading]);

//   return (
//     <>
//       {/* Loader - Full Screen */}
//       {loading && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "#ffffff",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 99999,
//           }}
//         >
//           <TruckLoader />
//         </div>
//       )}

//       {/* Main Content */}
//       {!loading && (
//         <div>
//           <Header setShowModal={setShowModal} />
//           <Practice setShowModal={setShowModal} />
//           <WhyChooseUs />
//           <ShipmentControl color={primaryColor} />
//           <HomeContact color={primaryColor} />
//           <ServicesSlider color={primaryColor} />
//           <Clients color={primaryColor} />
//           <Testimonials color={primaryColor} />
//           <Footer color={primaryColor} />
//           <ContactFormModal
//             show={showModal}
//             handleClose={() => setShowModal(false)}
//             color={primaryColor}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;
