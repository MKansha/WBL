import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Pagination,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { People, Person, ContactMail } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs"; // ✅ Import dayjs for date formatting

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const cardData = [
  { id: 1, title: "Leads", key: "leads", icon: <People /> },
  { id: 2, title: "Customers", key: "customers", icon: <Person /> },
  { id: 3, title: "Contacts", key: "contacts", icon: <ContactMail /> },
  { id: 4, title: "Total Inquiries", key: "total_leads", icon: <People /> },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // ✅ Blue header background
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function StatsCards() {
  const [counts, setCounts] = useState({ leads: 0, customers: 0, contacts: 0, total_leads: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Responsive check

  useEffect(() => {
    fetchCounts();
    fetchInquiries();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`);
      setCounts(response.data.counts || {});
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`);
      setInquiries(response.data.inquiries.map(inquiry => ({
        ...inquiry,
        date: dayjs(inquiry.created_at).format("DD/MM/YYYY"), // ✅ Format date
      })) || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handlePageChange = (event, value) => setPage(value);
  const paginatedInquiries = inquiries.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
      <Grid item xs={12} sx={{marginBottom: 3}}>
          <Grid container spacing={isSmallScreen ? 1 : 2} justifyContent="center">
            {cardData.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <Card sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  p: isSmallScreen ? 1.5 : 2, // Reduce padding on small screens
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "0.3s",
                  bgcolor: "white",
                  color: "black",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                    transform: isSmallScreen ? "scale(1.02)" : "scale(1.05)", // Reduce hover effect scaling
                  },
                }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ fontWeight: "bold" }}>
                        {card.title}
                      </Typography>
                      <Box sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "primary.main",
                        color: "white",
                        borderRadius: "8px",
                        width: isSmallScreen ? 28 : 35, // Reduce icon size on small screens
                        height: isSmallScreen ? 28 : 35,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "0.3s",
                      }}>
                        {card.icon}
                      </Box>
                      <Typography variant={isSmallScreen ? "h5" : "h4"} sx={{ fontWeight: "bold", mt: 1 }}>
                        {counts[card.key] || 0}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        
      </Grid>
      <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Latest Inquiries
          </Typography>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}> {/* ✅ Make table scrollable */}
            <Table className="table-responsive-md" aria-label="inquiries table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>Service</StyledTableCell>
                  <StyledTableCell>Message</StyledTableCell>
                  {!isSmallScreen && (
                    <>
                      <StyledTableCell>Company Name</StyledTableCell>
                      <StyledTableCell>Origin</StyledTableCell>
                      <StyledTableCell>Destination</StyledTableCell>
                    </>
                  )}
                  <StyledTableCell>Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedInquiries.map((inquiry) => (
                  <StyledTableRow key={inquiry.id}>
                    <TableCell>{inquiry.name}</TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.phone || "N/A"}</TableCell>
                    <TableCell>{inquiry.service}</TableCell>
                    <TableCell>{inquiry.message}</TableCell>
                    {!isSmallScreen && (
                      <>
                        <TableCell>{inquiry.company_name || "N/A"}</TableCell>
                        <TableCell>{inquiry.origin || "N/A"}</TableCell>
                        <TableCell>{inquiry.destination || "N/A"}</TableCell>
                      </>
                    )}
                    <TableCell>{inquiry.date}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
    </Box>
  );
}

export default StatsCards;
