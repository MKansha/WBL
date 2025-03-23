// import React, { useState, useEffect } from "react";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";
// import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const STORAGE_URL = process.env.REACT_APP_STORAGE_URL;

// const ServiceUploader = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [points, setPoints] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [services, setServices] = useState([]);

//   // Fetch existing services
//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/services`)
//       .then((response) => setServices(response.data))
//       .catch((error) => console.error("Error fetching services:", error));
      
//   }, []);
//   console.log(services);
//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);

//     // Convert newline-separated points to an array
//     const pointsArray = points.split("\n").filter(point => point.trim() !== "");
//     pointsArray.forEach((point, index) => formData.append(`points[${index}]`, point));

//     formData.append("image", image);

//     try {
//       const response = await axios.post(`${API_BASE_URL}/services`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Service uploaded successfully!");
//       setServices([...services, response.data]); // Update service list

//       // Clear form
//       setTitle("");
//       setDescription("");
//       setPoints("");
//       setImage(null);
//       setPreview(null);
//     } catch (error) {
//       console.error("Error uploading service:", error);
//       alert("Failed to upload service.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" fontWeight="bold" textAlign="center" mt={3} mb={2}>
//         Upload New Service
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Service Title"
//           fullWidth
//           required
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           margin="normal"
//         />

//         <TextField
//           label="Description"
//           fullWidth
//           required
//           multiline
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           margin="normal"
//         />

//         <TextField
//           label="Points (One per line)"
//           fullWidth
//           required
//           multiline
//           rows={4}
//           value={points}
//           onChange={(e) => setPoints(e.target.value)}
//           margin="normal"
//         />

//         <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: "10px" }} />

//         {preview && (
//           <Box mt={2}>
//             <Typography variant="subtitle1">Image Preview:</Typography>
//             <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
//           </Box>
//         )}

//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>
//           {loading ? "Uploading..." : "Upload Service"}
//         </Button>
//       </form>

//       {/* Display Uploaded Services */}
//       <Typography variant="h5" textAlign="center" mt={5}>
//         Uploaded Services
//       </Typography>
//       {services.map((service) => (
//   <Box key={service.id} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
//     <Typography variant="h6">{service.title}</Typography>
//     <Typography variant="body1">{service.description}</Typography>

//     <ul>
//       {Array.isArray(service.points) 
//         ? service.points.map((point, i) => (
//             <li key={i}>{point}</li>
//           ))
//         : JSON.parse(service.points || "[]").map((point, i) => (
//             <li key={i}>{point}</li>
//           ))
//       }
//     </ul>

//     <img 
//       src={service.image} 
//       alt={service.title} 
//       style={{ width: "100%", maxHeight: "200px" }} 
//     />
//   </Box>
// ))}

//     </Container>
//   );
// };

// export default ServiceUploader;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, TextField, Button, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ServiceUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [services, setServices] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Fetch services on load
  useEffect(() => {
    axios.get(`${API_BASE_URL}/services`)
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    // Convert new lines to array for points
    const pointsArray = points.split("\n").filter(point => point.trim() !== "");
    pointsArray.forEach((point, index) => formData.append(`points[${index}]`, point));

    formData.append("image", image);

    try {
      const response = await axios.post(`${API_BASE_URL}/services`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setServices([...services, response.data]);
      setTitle("");
      setDescription("");
      setPoints("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading service:", error);
    }
  };

  const handleEditService = (service) => {
    setEditData({ ...service, newImage: null, preview: service.image });
    setOpenEditModal(true);
  };

  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditData({
        ...editData,
        newImage: file,
        preview: URL.createObjectURL(file),
      });
    }
  };
  const handleUpdateService = async () => {
    if (!editData) return;
  
    try {
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("description", editData.description);
  
      // Add points as an array
      editData.points.forEach((point, index) => {
        formData.append(`points[${index}]`, point);
      });
  
      // Only append image if there's a new one to update
      if (editData.newImage) {
        formData.append("image", editData.newImage);
      }
  
      formData.append("_method", "PUT"); // Simulate PUT request if necessary (e.g., Laravel)
  
      // Send the form data to update the service
      await axios.post(
        `${API_BASE_URL}/services/${editData.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      // Close the modal after the update
      setOpenEditModal(false);
  
      // Fetch the updated list of services
      const response = await axios.get(`${API_BASE_URL}/services`);
      setServices(response.data); 
      console.log(response.data);
      
  
      alert("Service updated successfully!");
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service.");
    }
  };
  
  

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteService = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/services/${deleteId}`);
      setServices(services.filter((service) => service.id !== deleteId));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <Container maxWidth="false">
      <Typography variant="h5" textAlign="left" mt={3} mb={2}>
        Upload New Service
      </Typography>

      <Paper  elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Service Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Description" fullWidth  rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Points (One per line)" fullWidth multiline rows={4} value={points} onChange={(e) => setPoints(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Button variant="contained" color="primary" onClick={handleUpload} sx={{ ml: 2 }}>
              Upload
            </Button>
          </Grid>
          {preview && (
            <Box mt={2}>
              <Typography variant="subtitle1">Image Preview:</Typography>
              <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
            </Box>
          )}
        </Grid>
      </Paper>

      {/* Uploaded Services Table */}
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Uploaded Services
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#0d6efd", color: "white" }}>
                <TableCell style={{ color: "white" }}>No</TableCell>
                <TableCell style={{ color: "white" }}>Image</TableCell>
                <TableCell style={{ color: "white" }}>Title</TableCell>
                <TableCell style={{ color: "white" }}>Description</TableCell>
                <TableCell style={{ color: "white" }}>Points</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {services.map((service, index) => (
    <TableRow key={service.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <img src={service.image} alt={service.title} style={{ width: "80px", height: "auto", borderRadius: "5px" }} />
      </TableCell>
      <TableCell>{service.title}</TableCell>
      <TableCell>{service.description}</TableCell>
      <TableCell>{service.points}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => handleEditService(service)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => handleDeleteConfirmation(service.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
  <DialogTitle>Edit Service</DialogTitle>
  <DialogContent>
    {/* Image Preview */}
    {editData?.preview && (
      <img 
        src={editData.preview} 
        alt="Preview" 
        style={{ width: "100px", height: "auto", borderRadius: "5px", marginBottom: "10px" }} 
      />
    )}

    {/* File Upload */}
    <input type="file" accept="image/*" onChange={handleEditFileChange} />

    {/* Title Field */}
    <TextField 
      label="Title" 
      fullWidth 
      value={editData?.title || ""} 
      onChange={(e) => setEditData({ ...editData, title: e.target.value })} 
      sx={{ mt: 2 }} 
    />

    {/* Description Field */}
    <TextField 
      label="Description" 
      fullWidth 
      multiline 
      rows={3} 
      value={editData?.description || ""} 
      onChange={(e) => setEditData({ ...editData, description: e.target.value })} 
      sx={{ mt: 2 }} 
    />

    {/* Points Field */}
    <TextField 
  label="Points (One per line)" 
  fullWidth 
  multiline 
  rows={4} 
  value={editData?.points?.join("\n") || ""}
  onChange={(e) => 
    setEditData((prev) => ({ 
      ...prev, 
      points: e.target.value.split("\n") 
    }))
  }
  sx={{ mt: 2 }} 
/>




  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
    <Button onClick={handleUpdateService} color="primary">Update</Button>
  </DialogActions>
</Dialog>


      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete this service?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteService}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceUploader;
