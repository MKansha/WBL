import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Fixed rows per page

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleNoteChange = (id, notes) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, notes } : lead)));
  };

  const saveNote = async (id, notes) => {
    try {
      await axios.post(
        `${API_BASE_URL}/leads/${id}/save-note`,
        { notes },
        { headers: { "Content-Type": "application/json" } }
      );

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === id ? { ...lead, notes } : lead
        )
      );

      alert("Note saved successfully!");
      setEditingNoteId(null);
    } catch (error) {
      console.error("Error saving note:", error.response?.data || error.message);
    }
  };

  const moveLead = async (id, category) => {
    try {
      await axios.post(`${API_BASE_URL}/leads/${id}/move`, { category });
      alert(`Lead moved to ${category}`);
      fetchLeads();
    } catch (error) {
      console.error("Error moving lead:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Pagination logic
  const paginatedLeads = leads.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box>
         {/* Heading */}
         <Typography variant="h4" sx={{ mb: 3, textAlign: "left" }}>
        Leads
      </Typography>
      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Service</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Origin</StyledTableCell>
              <StyledTableCell>Destination</StyledTableCell>
              <StyledTableCell>Notes</StyledTableCell>
              <StyledTableCell>Move To</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLeads.map((lead) => (
              <StyledTableRow key={lead.id}>
                <StyledTableCell>{lead.name}</StyledTableCell>
                <StyledTableCell>{lead.email}</StyledTableCell>
                <StyledTableCell>{lead.phone || "N/A"}</StyledTableCell>
                <StyledTableCell>{lead.service}</StyledTableCell>
                <StyledTableCell>{lead.message}</StyledTableCell>
                <StyledTableCell>{lead.company_name || "N/A"}</StyledTableCell>
                <StyledTableCell>{lead.origin || "N/A"}</StyledTableCell>
                <StyledTableCell>{lead.destination || "N/A"}</StyledTableCell>
                <StyledTableCell>
                  {editingNoteId === lead.id ? (
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      value={lead.notes || ""}
                      onChange={(e) => handleNoteChange(lead.id, e.target.value)}
                      onBlur={() => saveNote(lead.id, lead.notes)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveNote(lead.id, lead.notes);
                          setEditingNoteId(null);
                          e.preventDefault();
                        }
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: lead.notes ? "#000" : "#888",
                      }}
                      onClick={() => setEditingNoteId(lead.id)}
                    >
                      {lead.notes || "Write Note..."}
                      <IconButton size="small" sx={{ marginLeft: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <Select
                    size="small"
                    value=""
                    displayEmpty
                    onChange={(e) => moveLead(lead.id, e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Move To
                    </MenuItem>
                    <MenuItem value="customers">Customer</MenuItem>
                    <MenuItem value="contacts">Contact</MenuItem>
                  </Select>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination outside the table */}
      <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={Math.ceil(leads.length / rowsPerPage)}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
}