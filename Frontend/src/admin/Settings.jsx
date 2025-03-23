import { useState, useEffect } from "react"
import axios from "axios"
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import "bootstrap/dist/css/bootstrap.min.css"

const Settings = () => {
  const [primaryColor, setPrimaryColor] = useState("#005DC5")
  const [email, setEmail] = useState("")
  const [email2, setEmail2] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [logoText, setLogoText] = useState("Logo")
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    linkedin: "",
  })
  const [toastOpen, setToastOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  const API_STORAGE_URL = process.env.REACT_APP_STORAGE_URL

  useEffect(() => {
    axios.get(`${API_BASE_URL}/settings`).then((res) => {
      setPrimaryColor(res.data.primary_color)
      setLogoPreview(`${API_STORAGE_URL}/storage/${res.data.logo}`)
      if (res.data.social_links) {
        try {
          const parsedSocialLinks = JSON.parse(res.data.social_links)
          setSocialLinks(parsedSocialLinks)
        } catch (error) {
          console.error("Error parsing social_links:", error)
        }
      }
    })

    axios.get(`${API_BASE_URL}/contact`).then((res) => {
      setEmail(res.data.email || "")
      setEmail2(res.data.email2 || "")
      setPhone(res.data.phone || "")
      setAddress(res.data.address || "")
    })
  }, [])

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogo(file)
      setLogoPreview(URL.createObjectURL(file))
      setLogoText(file.name)
    }
  }

  const handleUploadLogo = async () => {
    // if (!logo) {
    //   alert("Please select a logo first!")
    //   return
    // }
    const formData = new FormData()
    formData.append("logo", logo)
    try {
      await axios.post(`${API_BASE_URL}/settings/logo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    } catch (error) {
      console.error("Error updating logo:", error)
    }
  }

  const handleChangeColor = async () => {
    await axios.post(`${API_BASE_URL}/settings`, { primary_color: primaryColor })
  }

  const handleUpdateContact = async () => {
    await axios.post(`${API_BASE_URL}/contact`, { email, email2, phone, address })
  }

  const handleUpdateSocialLinks = async () => {
    await axios.post(`${API_BASE_URL}/settings/social-links`, { social_links: socialLinks })
  }

  const handleSaveAll = async () => {
    try {
      // Save operations
      await handleUploadLogo();
      await handleChangeColor();
      await handleUpdateContact();
      await handleUpdateSocialLinks();
  
      // After saving, re-fetch the updated data
      const settingsRes = await axios.get(`${API_BASE_URL}/settings`);
      setPrimaryColor(settingsRes.data.primary_color);
      setLogoPreview(`${API_STORAGE_URL}/storage/${settingsRes.data.logo}`);
      if (settingsRes.data.social_links) {
        try {
          const parsedSocialLinks = JSON.parse(settingsRes.data.social_links);
          setSocialLinks(parsedSocialLinks);
        } catch (error) {
          console.error("Error parsing social_links:", error);
        }
      }
  
      const contactRes = await axios.get(`${API_BASE_URL}/contact`);
      setEmail(contactRes.data.email || "");
      setEmail2(contactRes.data.email2 || "");
      setPhone(contactRes.data.phone || "");
      setAddress(contactRes.data.address || "");
  
      // Show toast on successful save
      setToastOpen(true);
    } catch (error) {
      console.error("Error during save:", error);
      // Optionally, handle errors, e.g., show a toast or alert
    }
  };
  

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: isMobile ? 2 : 3 }}>
      <Paper elevation={0} sx={{ border: "1px solid #4697F7", borderRadius: "4px", p: isMobile ? 2 : 3 }}>
        <Typography variant="h6" gutterBottom>
          Logo Upload
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" value={logoText} InputProps={{ readOnly: true }} />
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              style={{ display: "none" }}
              id="logo-upload"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="contained" onClick={() => document.getElementById("logo-upload").click()}>
              Upload
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: isMobile ? "right" : "left" }}>
            {logoPreview && (
              <img src={logoPreview || "/placeholder.svg"} alt="Logo Preview" width={isMobile ? 80 : 100} />
            )}
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Brand Color
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Select Here:</Typography>
              <Box
                sx={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px solid white",
                }}
              >
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: "transparent",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Contact Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Alternate Email"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Social Links
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {Object.keys(socialLinks).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                size="small"
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={socialLinks[key]}
                onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" onClick={handleSaveAll}>
            Save
          </Button>
        </Box>
      </Paper>
      <Snackbar
  open={toastOpen}
  autoHideDuration={3000}
  onClose={() => setToastOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ bgcolor: "green", color: "white" }}>
    Settings Updated Successfully!
  </Alert>
</Snackbar>

    </Container>
  )
}

export default Settings

