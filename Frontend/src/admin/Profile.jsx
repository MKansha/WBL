import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Snackbar, Alert } from "@mui/material"; // Import MUI Snackbar and Alert


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Profile() {
  const [formData, setFormData] = useState({
    company_name: "",
    gst: "",
    contact_person: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    district: "",
    state: "",
    postal_code: "",
    country: "",
    profile_image: null,
  });

  const [imagePreview, setImagePreview] = useState(""); // Store profile image URL
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // **Fetch Profile Data on Component Load**
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/profile`)
      .then((response) => {
        setFormData(response.data);
        setImagePreview(response.data.profile_image); // Set image URL
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setSnackbar({ open: true, message: "Failed to load profile", severity: "error" });
        setLoading(false);
      });
  }, []);

  // **Handle Input Change**
  const handleChange = (e) => {
    if (e.target.name === "profile_image") {
      const file = e.target.files[0];
      setFormData({ ...formData, profile_image: file });

      // Preview the selected image before uploading
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // **Handle Form Submission**
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "profile_image") {
        // Append only if a new file is selected
        if (formData.profile_image instanceof File) {
          form.append("profile_image", formData.profile_image);
        }
      } else {
        form.append(key, formData[key]);
      }
    });

    axios
      .post(`${API_BASE_URL}/profile`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setSnackbar({ open: true, message: response.data.message, severity: "success" });
        setImagePreview(response.data.profile_image);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setSnackbar({ open: true, message: "Failed to update profile", severity: "error" });
      });
  };

  // **Handle Snackbar Close**
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-fluid">
  <h2 className="mb-4">Profile</h2>

  <div className="card p-4">
    <h4 className="mb-3">Profile Details</h4>

    <form onSubmit={handleSubmit}>
      {/* Profile Image Display */}
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Profile Image</label>
        <div className="col-sm-6">
          {imagePreview && (
            <img src={imagePreview} alt="Profile" className="img-thumbnail mb-2" style={{ maxWidth: "150px", maxHeight: "150px" }} />
          )}
          <input type="file" name="profile_image" className="form-control mt-2" onChange={handleChange} />
        </div>
      </div>

      {/* Other Profile Fields */}
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Company Name</label>
        <div className="col-sm-9">
          <input type="text" name="company_name" className="form-control" value={formData.company_name} onChange={handleChange} />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">GST</label>
        <div className="col-sm-9">
          <input type="text" name="gst" className="form-control" value={formData.gst} onChange={handleChange} />
        </div>
      </div>

      {/* Contact Person */}
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Contact Person</label>
        <div className="col-sm-9">
          <input type="text" name="contact_person" className="form-control" value={formData.contact_person} onChange={handleChange} placeholder="Full Name" />
        </div>
      </div>

      {/* Mobile & Email */}
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Mobile No</label>
        <div className="col-sm-9">
          <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} placeholder="Mobile No" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Email ID</label>
        <div className="col-sm-9">
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
      </div>

      {/* Address Fields */}
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Address</label>
        <div className="col-sm-9">
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} placeholder="Street Address" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">City</label>
        <div className="col-sm-9">
          <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} placeholder="City/Town/Village" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">District</label>
        <div className="col-sm-9">
          <input type="text" name="district" className="form-control" value={formData.district} onChange={handleChange} placeholder="District" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">State</label>
        <div className="col-sm-9">
          <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} placeholder="State" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Postal Code</label>
        <div className="col-sm-9">
          <input type="text" name="postal_code" className="form-control" value={formData.postal_code} onChange={handleChange} placeholder="Postal Code" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Country</label>
        <div className="col-sm-9">
          <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} placeholder="Country" />
        </div>
      </div>

      <hr />

      {/* Submit Button */}
      <div className="d-flex justify-content-end">
        <button type="reset" className="btn btn-outline-secondary me-2">Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  </div>

  {/* Snackbar Notification */}
  <Snackbar 
    open={snackbar.open} 
    autoHideDuration={3000} 
    onClose={handleCloseSnackbar}
    anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
  >
    <Alert 
      onClose={handleCloseSnackbar} 
      severity={snackbar.severity} 
      variant="filled"
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
</div>

  );
}

export default Profile;