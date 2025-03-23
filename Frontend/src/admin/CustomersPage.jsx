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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`); // API for customers
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleNoteChange = (id, notes) => {
    setCustomers(customers.map((customer) => (customer.id === id ? { ...customer, notes } : customer)));
  };

  const saveNote = async (id, notes) => {
    try {
      await axios.post(
        `${API_BASE_URL}/${id}/save-note`,
        { notes },
        { headers: { "Content-Type": "application/json" } }
      );

      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === id ? { ...customer, notes } : customer
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

  const paginatedCustomers = customers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box>
      {/* Heading */}
      <Typography variant="h4" sx={{ mb: 3}}>
        Customers
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
            {paginatedCustomers.map((customer) => (
              <StyledTableRow key={customer.id}>
                <StyledTableCell>{customer.name}</StyledTableCell>
                <StyledTableCell>{customer.email}</StyledTableCell>
                <StyledTableCell>{customer.phone || "N/A"}</StyledTableCell>
                <StyledTableCell>{customer.service}</StyledTableCell>
                <StyledTableCell>{customer.message}</StyledTableCell>
                <StyledTableCell>{customer.company_name || "N/A"}</StyledTableCell>
                <StyledTableCell>{customer.origin || "N/A"}</StyledTableCell>
                <StyledTableCell>{customer.destination || "N/A"}</StyledTableCell>
                <StyledTableCell>
                  {editingNoteId === customer.id ? (
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      value={customer.notes || ""}
                      onChange={(e) => handleNoteChange(customer.id, e.target.value)}
                      onBlur={() => saveNote(customer.id, customer.notes)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveNote(customer.id, customer.notes);
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
                        color: customer.notes ? "#000" : "#888",
                      }}
                      onClick={() => setEditingNoteId(customer.id)}
                    >
                      {customer.notes || "Write Note..."}
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
          count={Math.ceil(customers.length / rowsPerPage)}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
}