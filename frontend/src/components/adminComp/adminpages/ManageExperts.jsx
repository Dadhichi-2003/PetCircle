import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
} from "@mui/material";

const ManageExperts = () => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState(null);

  // Pagination
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);

  useEffect(() => {
    fetchExperts();
  }, [refresh]);

  useEffect(() => {
    handleSearch();
  }, [search, experts]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/experts");
      setExperts(res.data);
    } catch (err) {
      console.error("Error fetching experts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = experts.filter(
      (exp) =>
        exp?.username.toLowerCase().includes(search.toLowerCase()) ||
        exp?.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredExperts(filtered);
    setPage(1); // Reset to first page after search change
  };

  const openDeleteDialog = (id) => {
    setSelectedExpertId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedExpertId(null);
    setDeleteDialogOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/admin/expert/${selectedExpertId}`);
      setRefresh((prev) => !prev); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting expert:", err);
    } finally {
      closeDeleteDialog();
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Slice data for current page
  const paginatedExperts = filteredExperts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Manage Experts
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <TextField
          label="Search by username or email"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experts.map((exp) => (
              <TableRow key={exp._id}>
                <TableCell>{exp?.username}</TableCell>
                <TableCell>{exp?.email}</TableCell>
                <TableCell>
                  <Chip label="Expert" color="primary" />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" gap={1} justifyContent="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => openDeleteDialog(exp._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this expert? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageExperts;
