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

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`); // Update API endpoint for contacts
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleNoteChange = (id, notes) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, notes } : contact)));
  };

  const saveNote = async (id, notes) => {
    try {
      await axios.post(
        `${API_BASE_URL}/contacts${id}/save-note`,
        { notes },
        { headers: { "Content-Type": "application/json" } }
      );

      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === id ? { ...contact, notes } : contact
        )
      );

      alert("Note saved successfully!");
      setEditingNoteId(null);
    } catch (error) {
      console.error("Error saving note:", error.response?.data || error.message);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedContacts = contacts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box>
      {/* Heading */}
      <Typography variant="h4" sx={{ mb: 3}}>
        Contacts
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
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <StyledTableRow key={contact.id}>
                <StyledTableCell>{contact.name}</StyledTableCell>
                <StyledTableCell>{contact.email}</StyledTableCell>
                <StyledTableCell>{contact.phone || "N/A"}</StyledTableCell>
                <StyledTableCell>{contact.service}</StyledTableCell>
                <StyledTableCell>{contact.message}</StyledTableCell>
                <StyledTableCell>{contact.company_name || "N/A"}</StyledTableCell>
                <StyledTableCell>{contact.origin || "N/A"}</StyledTableCell>
                <StyledTableCell>{contact.destination || "N/A"}</StyledTableCell>
                <StyledTableCell>
                  {editingNoteId === contact.id ? (
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      value={contact.notes || ""}
                      onChange={(e) => handleNoteChange(contact.id, e.target.value)}
                      onBlur={() => saveNote(contact.id, contact.notes)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveNote(contact.id, contact.notes);
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
                        color: contact.notes ? "#000" : "#888",
                      }}
                      onClick={() => setEditingNoteId(contact.id)}
                    >
                      {contact.notes || "Write Note..."}
                      <IconButton size="small" sx={{ marginLeft: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={Math.ceil(contacts.length / rowsPerPage)}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
}