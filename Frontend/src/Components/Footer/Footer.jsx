import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box, Link, IconButton } from "@mui/material";
import { Facebook, LinkedIn, Instagram, WhatsApp, Phone, Email, LocationOn ,Twitter} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_STORAGE_URL = process.env.REACT_APP_STORAGE_URL;

export default function Footer() {
  const [settings, setSettings] = useState({
    logo: "",
    companyName: "WE BELIEVE LOGISTICS",
    companyDescription: "With over 20 years of experience, We Believe Logistics offers reliable and tailored logistics solutions, specializing in import, export, and transportation services worldwide.",
    socialLinks: {
      facebook: "#",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
      whatsapp: "https://wa.me/918056939559",
    },
    footerText: (
      <>
        © 2025 Your Company. All Rights Reserved. Designed By{" "}
        <a style={{color:"white",textDecoration:"none"}} href="https://www.mntfuture.com/" target="_blank" rel="noopener noreferrer">
          MntFuture
        </a>
      </>
    ),
    themeColor: "#007bff",
  });
  

  const [contactDetails, setContactDetails] = useState({
    phone: "+91 8056939559",
    email: "docs@webelievelogistics.com",
    email2: "docs@webelievelogistics.com",
    address: "4/182D State Bank Colony Mac Garden, Tuticorin - 628002",
  });

  useEffect(() => {
    const fetchSettings = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/settings`);
      
          let parsedSocialLinks = {};
          if (response.data.social_links) {
            try {
              parsedSocialLinks = JSON.parse(response.data.social_links);
            } catch (error) {
              console.error("Error parsing social_links:", error);
            }
          }
      
          setSettings({
            logo: `${API_STORAGE_URL}/storage/${response.data.logo}` || "",
            companyName: response.data.company_name || "WE BELIEVE LOGISTICS",
            companyDescription: response.data.company_description || settings.companyDescription,
            socialLinks: {
              facebook: parsedSocialLinks.facebook || "",
              twitter: parsedSocialLinks.twitter || "", // ✅ Ensure Twitter is set
              linkedin: parsedSocialLinks.linkedin || "",
              instagram: parsedSocialLinks.instagram || "",
            },
            footerText: response.data.footer_text || settings.footerText,
            themeColor: response.data.primary_color || settings.themeColor,
          });
      
          console.log("Fetched social links:", parsedSocialLinks);
        } catch (error) {
          console.error("Error fetching settings:", error);
        }
      };
      
      

    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/contact`);
        setContactDetails({
          phone: response.data.phone || contactDetails.phone,
          email: response.data.email || contactDetails.email,
          email2: response.data.email2 || contactDetails.email2,
          address: response.data.address || contactDetails.address,
        });
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchSettings();
    fetchContactDetails();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#0a192f", color: "white", py: 4, position: "relative" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Company */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {settings.logo && (
                <img src={settings.logo} alt="Company Logo" style={{ height: 50, marginRight: 10 }} />
              )}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {/* {settings.companyName} */}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {settings.companyDescription}
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
  {settings.socialLinks.facebook && (
    <IconButton
      component="a"
      href={settings.socialLinks.facebook}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "white",
        "&:hover": { color: settings.themeColor },
        transition: "0.3s",
      }}
    >
      <Facebook fontSize="large" />
    </IconButton>
  )}
  {settings.socialLinks.twitter && (  // ✅ Twitter added here
    <IconButton
      component="a"
      href={settings.socialLinks.twitter}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "white",
        "&:hover": { color: settings.themeColor },
        transition: "0.3s",
      }}
    >
      <Twitter fontSize="large" />
    </IconButton>
  )}
  {settings.socialLinks.linkedin && (
    <IconButton
      component="a"
      href={settings.socialLinks.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "white",
        "&:hover": { color: settings.themeColor },
        transition: "0.3s",
      }}
    >
      <LinkedIn fontSize="large" />
    </IconButton>
  )}
  {settings.socialLinks.instagram && (
    <IconButton
      component="a"
      href={settings.socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "white",
        "&:hover": { color: settings.themeColor },
        transition: "0.3s",
      }}
    >
      <Instagram fontSize="large" />
    </IconButton>
  )}
</Box>


          </Grid>

          {/* Useful Links (One Per Line) */}
          <Grid item xs={12} md={4}>
  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
    Useful Links
  </Typography>
  <Box>
    {/* Home Link (Displayed Alone) */}
    <Typography variant="body2" sx={{ py: 0.5 }}>
      <Link
        href="/"
        color="inherit"
        sx={{
          textDecoration: "none",
          fontWeight: "bold",
          "&:hover": { color: settings.themeColor }, // Hover Effect
          color: window.location.pathname === "/" ? settings.themeColor : "inherit", // Active Link Color
        }}
      >
        Home
      </Link>
    </Typography>

    {/* Other Links */}
    {["About", "Services", "Contact"].map((link) => {
      const path = `/${link.toLowerCase()}`;
      return (
        <Typography key={link} variant="body2" sx={{ py: 0.5 ,fontWeight: "bold"}}>
          <Link
            href={path}
            color="inherit"
            sx={{
              textDecoration: "none",
              "&:hover": { color: settings.themeColor }, // Hover Effect
              color: window.location.pathname === path ? settings.themeColor : "inherit", // Active Link Color
            }}
          >
            {link}
          </Link>
        </Typography>
      );
    })}
  </Box>
</Grid>


          {/* Contact Details */}
          <Grid item xs={12} md={4}>
  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
    Contact
  </Typography>

  {/* Phone */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
    <Box
      sx={{
        width: 32,
        height: 32,
        backgroundColor: settings.themeColor,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Phone sx={{ color: "white", fontSize: 20 }} />
    </Box>
    <Typography variant="body2">
      <strong>Tel:</strong> {contactDetails.phone}
    </Typography>
  </Box>

  {/* Email */}
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, py: 1 }}>
    <Box
      sx={{
        width: 32,
        height: 32,
        backgroundColor: settings.themeColor,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Email sx={{ color: "white", fontSize: 20 }} />
    </Box>
    <Box>
      <Typography variant="body2">
        <strong>Email:</strong>{" "}
        <Link href={`mailto:${contactDetails.email}`} color="inherit" sx={{ textDecoration: "none" }}>
          {contactDetails.email}
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Email 2:</strong>{" "}
        <Link href={`mailto:${contactDetails.email2}`} color="inherit" sx={{ textDecoration: "none" }}>
          {contactDetails.email2}
        </Link>
      </Typography>
    </Box>
  </Box>

  {/* Location */}
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, py: 1 }}>
  <Box
    sx={{
      width: 32,
      height: 32,
      backgroundColor: settings.themeColor,
      borderRadius: "50%",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0, // Prevents shrinking
    }}
  >
    <LocationOn sx={{ color: "white", fontSize: 20 }} />
  </Box>
  <Typography variant="body2" sx={{ display: "flex", flexDirection: "column" }}>
    <strong>Location:</strong> {contactDetails.address}
  </Typography>
</Box>

</Grid>

        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ mt: 4, textAlign: "center", opacity: 0.6 }}>
          <Typography variant="body2">{settings.footerText}</Typography>
        </Box>
      </Container>

      
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          zIndex: 1000,
          right: 20,
          backgroundColor: "#25D366", 
          borderRadius: "50%",
          padding: "8px",
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <Link
           href={"https://wa.me/+919943953559"}
          target="_blank"
          sx={{
            position: "relative",
            display: "inline-block",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "60px",
              height: "60px",
              backgroundColor: "rgba(37, 211, 102, 0.5)", 
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              animation: "waveEffect 1.5s infinite ease-out",
              
            },
          }}
        >
          <WhatsApp sx={{ fontSize: 40, color: "white", position: "relative", zIndex: 1 }} />
        </Link>
      </Box>

      
      <Box
      sx={{
        position: "fixed",
        bottom: 90, 
        right: 20,
        zIndex: 1000,
      }}
    >
      
      {/* <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(225, 48, 108, 0.4)", 
          transform: "translate(-50%, -50%)",
          animation: "waveEffect 1.5s infinite ease-out",
        }}
      /> */}

      
      {/* <Box
        sx={{
          position: "relative",
          background: "linear-gradient(45deg, #833AB4, #E1306C, #FD1D1D)", 
          borderRadius: "50%",
          padding: "10px",
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.1)" },
          width: "50px",
          height: "50px",
        }}
      >
        <Link
          href={settings?.socialLinks?.instagram || "#"}
          target="_blank"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            textDecoration: "none",
          }}
        >
          <Instagram sx={{ fontSize: 32, color: "white" }} />
        </Link>
      </Box> */}

      
      <style>
        {`
          @keyframes waveEffect {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.6;
            }
            100% {
              transform: translate(-50%, -50%) scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
    </Box>
  );
}
