// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Grid, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Settings = () => {
//   const [primaryColor, setPrimaryColor] = useState("#005DC5");
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
// const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/sliders`).then((res) => {
//       setUploadedImages(res.data);
//       console.log(res.data);
      
//     });
//   }, []);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedImage) return;
//     const formData = new FormData();
//     formData.append("image", selectedImage);
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     try {
//       await axios.post(`${API_BASE_URL}/sliders`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setTitle("");
//       setSubtitle("");
//       setSelectedImage(null);
//       axios.get(`${API_BASE_URL}/sliders`).then((res) => setUploadedImages(res.data));
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleDeleteImage = async () => {
//     try {
//       await axios.delete(`${API_BASE_URL}/sliders/${deleteId}`);
//       setUploadedImages(uploadedImages.filter((image) => image.id !== deleteId));
//       setOpenDeleteDialog(false);
//     } catch (error) {
//       console.error("Error deleting image:", error);
//     }
//   };
  
//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setOpenDeleteDialog(true);
//   };

//   const handleEditImage = (image) => {
//     setEditData({ ...image, newImage: null, preview: image.image }); // Ensure preview is set
//     setOpenEditModal(true);
//   };
  
//   const handleEditFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setEditData((prev) => ({
//         ...prev,
//         newImage: file,
//         preview: URL.createObjectURL(file), // Correct way to update preview
//       }));
//     }
//   };
//   const handleUpdateImage = async () => {
//     if (!editData) return;
    
//     try {
//       const formData = new FormData();
//       formData.append("title", editData.title);
//       formData.append("subtitle", editData.subtitle);
      
//       if (editData.newImage) {
//         formData.append("image", editData.newImage);
//       }
  
//       formData.append("_method", "PUT"); // ✅ Simulate PUT request with POST

//       await axios.post(`${API_BASE_URL}/sliders/${editData.id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
  
//       setOpenEditModal(false);
//       axios.get(`${API_BASE_URL}/sliders`).then((res) => setUploadedImages(res.data));
//     } catch (error) {
//       console.error("Error updating image:", error);
//     }
//   };
    
  

//   return (
//     <Container maxWidth={false} sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
//       <Paper elevation={3} className="p-4">
//         <Typography variant="h5" className="mb-3">Upload Slider Image</Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <TextField label="Heading" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField label="Sub Heading" fullWidth value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
//           </Grid>
//           <Grid item xs={12}>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper elevation={0} sx={{ border: "1px solid #4697F7", borderRadius: "4px", p: { xs: 2, md: 3 }, mt: 4 }}>
//         <Typography variant="h6" gutterBottom>Uploaded Images</Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow style={{ backgroundColor: "#0d6efd", color: "white" }}>
//                 <TableCell style={{ color: "white" }}>No</TableCell>
//                 <TableCell style={{ color: "white" }}>Image</TableCell>
//                 <TableCell style={{ color: "white" }}>Heading</TableCell>
//                 <TableCell style={{ color: "white" }}>Sub Heading</TableCell>
//                 <TableCell style={{ color: "white" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {uploadedImages.map((image, index) => {
//                 const imageUrl = image.image; // Correct URL format
//                 // console.log(imageUrl);
                
//                 return (
//                   <TableRow key={image.id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>
//                       <img
//                         src={imageUrl}
//                         alt="Uploaded"
//                         style={{ width: "100px", height: "auto", borderRadius: "5px" }}
//                         onError={(e) => (e.target.src = "/placeholder.jpg")} // Optional fallback image
//                       />
//                     </TableCell>
//                     <TableCell>{image.title}</TableCell>
//                     <TableCell>{image.subtitle}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleEditImage(image)}>
//                         <Edit />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => confirmDelete(image.id)}>
//   <Delete />
// </IconButton>

//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

// <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
//   <DialogTitle>Edit Image</DialogTitle>
//   <DialogContent>
//     {/* Image Preview (Updates on File Change) */}
//     {editData?.preview && (
//       <div style={{ textAlign: "center", marginBottom: "15px" }}>
//         <img
//           src={editData.preview} // Updated preview image
//           alt="Preview"
//           style={{ width: "120px", height: "auto", borderRadius: "5px" }}
//           onError={(e) => (e.target.src = "/placeholder.jpg")}
//         />
//       </div>
//     )}

//     {/* File Upload (Updates Preview on Change) */}
//     <input 
//       type="file" 
//       accept="image/*" 
//       onChange={handleEditFileChange} 
//     />

//     {/* Title & Subtitle Fields */}
//     <TextField 
//       label="Heading" 
//       fullWidth 
//       value={editData?.title || ""} 
//       onChange={(e) => setEditData({ ...editData, title: e.target.value })} 
//       sx={{ mt: 2 }} 
//     />
//     <TextField 
//       label="Sub Heading" 
//       fullWidth 
//       value={editData?.subtitle || ""} 
//       onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })} 
//       sx={{ mt: 2 }} 
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
//     <Button onClick={handleUpdateImage} color="primary">Update</Button>
//   </DialogActions>
// </Dialog>
// <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
//   <DialogTitle>Confirm Delete</DialogTitle>
//   <DialogContent>Are you sure you want to delete this image?</DialogContent>
//   <DialogActions>
//     <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
//     <Button onClick={handleDeleteImage} color="error">Delete</Button>
//   </DialogActions>
// </Dialog>


//     </Container>
//   );
// };

// export default Settings;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = () => {
  const [primaryColor, setPrimaryColor] = useState("#005DC5");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/sliders`).then((res) => {
      setUploadedImages(res.data);
      console.log(res.data);
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    try {
      await axios.post(`${API_BASE_URL}/sliders`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setSubtitle("");
      setSelectedImage(null);
      axios.get(`${API_BASE_URL}/sliders`).then((res) => setUploadedImages(res.data));
      setSnackbarMessage("Image uploaded successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      setSnackbarMessage("Error uploading image.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/sliders/${deleteId}`);
      setUploadedImages(uploadedImages.filter((image) => image.id !== deleteId));
      setOpenDeleteDialog(false);
      setSnackbarMessage("Image deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting image:", error);
      setSnackbarMessage("Error deleting image.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleEditImage = (image) => {
    setEditData({ ...image, newImage: null, preview: image.image });
    setOpenEditModal(true);
  };

  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditData((prev) => ({
        ...prev,
        newImage: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdateImage = async () => {
    if (!editData) return;

    try {
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("subtitle", editData.subtitle);

      if (editData.newImage) {
        formData.append("image", editData.newImage);
      }

      formData.append("_method", "PUT");

      await axios.post(`${API_BASE_URL}/sliders/${editData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpenEditModal(false);
      axios.get(`${API_BASE_URL}/sliders`).then((res) => setUploadedImages(res.data));
      setSnackbarMessage("Image updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating image:", error);
      setSnackbarMessage("Error updating image.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" className="mb-3">Upload Slider Image</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="Heading" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Sub Heading" fullWidth value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ border: "1px solid #4697F7", borderRadius: "4px", p: { xs: 2, md: 3 }, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Uploaded Images</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#0d6efd", color: "white" }}>
                <TableCell style={{ color: "white" }}>No</TableCell>
                <TableCell style={{ color: "white" }}>Image</TableCell>
                <TableCell style={{ color: "white" }}>Heading</TableCell>
                <TableCell style={{ color: "white" }}>Sub Heading</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedImages.map((image, index) => {
                const imageUrl = image.image;
                return (
                  <TableRow key={image.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        style={{ width: "100px", height: "auto", borderRadius: "5px" }}
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                    </TableCell>
                    <TableCell>{image.title}</TableCell>
                    <TableCell>{image.subtitle}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditImage(image)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => confirmDelete(image.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          {editData?.preview && (
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <img
                src={editData.preview}
                alt="Preview"
                style={{ width: "120px", height: "auto", borderRadius: "5px" }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleEditFileChange} 
          />
          <TextField 
            label="Heading" 
            fullWidth 
            value={editData?.title || ""} 
            onChange={(e) => setEditData({ ...editData, title: e.target.value })} 
            sx={{ mt: 2 }} 
          />
          <TextField 
            label="Sub Heading" 
            fullWidth 
            value={editData?.subtitle || ""} 
            onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })} 
            sx={{ mt: 2 }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleUpdateImage} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this image?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteImage} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;