import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TestimonialSettings = () => {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [feedback, setFeedback] = useState("");
  const [uploadedTestimonials, setUploadedTestimonials] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch testimonials
    axios.get(`${API_BASE_URL}/testimonials`).then((res) => {
      setUploadedTestimonials(res.data);
    });
  }, []);

  const handleAddTestimonial = async () => {
    if (!name || !district || !feedback) return;
    try {
      const testimonialData = { name, district, feedback };
      await axios.post(`${API_BASE_URL}/testimonials`, testimonialData);
      setName("");
      setDistrict("");
      setFeedback("");
      axios.get(`${API_BASE_URL}/testimonials`).then((res) => setUploadedTestimonials(res.data));
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteTestimonial = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/testimonials/${deleteId}`);
      setUploadedTestimonials(uploadedTestimonials.filter((testimonial) => testimonial.id !== deleteId));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleEditTestimonial = (testimonial) => {
    setEditData({ ...testimonial });
    setOpenEditModal(true);
  };

  const handleUpdateTestimonial = async () => {
    if (!editData) return;
    try {
      await axios.put(`${API_BASE_URL}/testimonials/${editData.id}`, editData);
      setOpenEditModal(false);
      axios.get(`${API_BASE_URL}/testimonials`).then((res) => setUploadedTestimonials(res.data));
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" className="mb-3">Add Testimonial</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="District" fullWidth value={district} onChange={(e) => setDistrict(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Feedback" fullWidth multiline rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddTestimonial}>Add Testimonial</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ border: "1px solid #4697F7", borderRadius: "4px", p: { xs: 2, md: 3 }, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Uploaded Testimonials</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#0d6efd", color: "white" }}>
                <TableCell style={{ color: "white" }}>No</TableCell>
                <TableCell style={{ color: "white" }}>Name</TableCell>
                <TableCell style={{ color: "white" }}>District</TableCell>
                <TableCell style={{ color: "white" }}>Feedback</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedTestimonials.map((testimonial, index) => (
                <TableRow key={testimonial.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.district}</TableCell>
                  <TableCell>{testimonial.feedback}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditTestimonial(testimonial)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => confirmDelete(testimonial.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Testimonial</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editData?.name || ""}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            label="District"
            fullWidth
            value={editData?.district || ""}
            onChange={(e) => setEditData({ ...editData, district: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Feedback"
            fullWidth
            multiline
            rows={3}
            value={editData?.feedback || ""}
            onChange={(e) => setEditData({ ...editData, feedback: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleUpdateTestimonial} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this testimonial?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteTestimonial} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TestimonialSettings;
