import React from "react";
import Lottie from "lottie-react";
import truckAnimation from "./truck-loading.json"; 

const TruckLoader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Lottie animationData={truckAnimation} loop={true} style={{ width: 300, height: 300 }} />
    </div>
  );
};

export default TruckLoader;
