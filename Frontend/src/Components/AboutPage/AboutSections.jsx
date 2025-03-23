// import React from "react";
// import { Container, Grid, Typography, Box } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";
// import missionImg from "../../assets/images/mission.png"; // Replace with actual image
// import whyChooseImg from "../../assets/images/whyChoose.png"; // Replace with actual image

// const sections = [
//   {
//     title: "Mission Statement",
//     description: `Our mission is to provide customers with safe, secure, and efficient logistics services while ensuring their satisfaction through personalized service and timely deliveries. We believe that logistics is more than just moving goods; it’s about building lasting relationships with our clients.`,
//     points: [
//       "Export & Import (Domestic & International)",
//       "Air, Sea, Rail, and Transport Logistics",
//       "FCL (Full Container Load) and LCL (Less than Container Load) Services Worldwide",
//       "Warehousing, Palletization, Brokering, and Trading",
//       "Specialized Reefer and Project Cargo Handling",
//     ],
//     image: missionImg,
//   },
//   {
//     title: "Why Choose Us?",
//     description: `With more than two decades of expertise, we specialize in handling temperature-sensitive cargo and bulk shipments, providing tailor-made solutions based on each client’s specific needs. Our team’s commitment to service excellence and attention to detail sets us apart from the competition.`,
//     points: [
//       "Seasoned professionals with 20+ years of shipping experience.",
//       "Expertise in high-value shipments and VIP client handling.",
//       "End-to-end cargo tracking and personalized customer support.",
//     ],
//     image: whyChooseImg,
//   },
// ];

// const AboutSections = ({ color }) => {
//   return (
//     <Container maxWidth="lg" sx={{ py: 5 }}>
//       {sections.map((section, index) => (
//         <Grid
//           container
//           spacing={4}
//           alignItems="center"
//           sx={{ mb: 5 }}
//           key={index}
//           direction={index % 2 === 0 ? "row" : "row-reverse"} // Even-Odd logic
//         >
//           {/* Text Section */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" fontWeight={700} sx={{ color }} gutterBottom>
//               {section.title}
//             </Typography>
//             <Typography variant="body1" color="textSecondary" paragraph>
//               {section.description}
//             </Typography>
//             <Box>
//               {section.points.map((point, i) => (
//                 <Typography key={i} variant="body1" sx={{ mb: 1 }}>
//                   • {point}
//                 </Typography>
//               ))}
//             </Box>
//           </Grid>

//           {/* Image Section */}
//           <Grid item xs={12} md={6}>
//             <Box sx={{ display: "flex", justifyContent: "center", borderRadius: 2, overflow: "hidden" }}>
//               <img src={section.image} alt={section.title} style={{ width: "100%", borderRadius: "8px" }} />
//             </Box>
//           </Grid>
//         </Grid>
//       ))}
//     </Container>
//   );
// };

// export default AboutSections;



import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import missionImg from "../../assets/images/mission.png"; // Replace with actual image
import whyChooseImg from "../../assets/images/whyChoose.png"; // Replace with actual image

const sections = [
  {
    title: "Mission Statement",
    description: `Our mission is to provide customers with safe, secure, and efficient logistics services while ensuring their satisfaction through personalized service and timely deliveries. We believe that logistics is more than just moving goods; it’s about building lasting relationships with our clients.`,
    points: [
      "Export & Import (Domestic & International)",
      "Air, Sea, Rail, and Transport Logistics",
      "FCL (Full Container Load) and LCL (Less than Container Load) Services Worldwide",
      "Warehousing, Palletization, Brokering, and Trading",
      "Specialized Reefer and Project Cargo Handling",
    ],
    image: missionImg,
  },
  {
    title: "Why Choose Us?",
    description: `With more than two decades of expertise, we specialize in handling temperature-sensitive cargo and bulk shipments, providing tailor-made solutions based on each client’s specific needs. Our team’s commitment to service excellence and attention to detail sets us apart from the competition.`,
    points: [
      "Seasoned professionals with 20+ years of shipping experience.",
      "Expertise in high-value shipments and VIP client handling.",
      "End-to-end cargo tracking and personalized customer support.",
    ],
    image: whyChooseImg,
  },
];

const AboutSections = ({ color }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {sections.map((section, index) => (
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{ mb: 8 }} // Added spacing between sections
          key={index}
          direction={index % 2 === 0 ? "row" : "row-reverse"} // Even-Odd logic
        >
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600} sx={{ color }} gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {section.description}
            </Typography>

            {/* Bullet Points with Tick Icon */}
            <Box>
              {section.points.map((point, i) => (
                <Typography
                  key={i}
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", mb: 2 }} // Added margin-bottom for spacing
                >
                  <CheckCircle sx={{ color: `${color} !important`, mr: 1 }} />
                  {point}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center", borderRadius: 2, overflow: "hidden" }}>
              <img src={section.image} alt={section.title} style={{ width: "100%", borderRadius: "8px" }} />
            </Box>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default AboutSections;
