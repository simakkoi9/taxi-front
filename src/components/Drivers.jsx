// components/Drivers.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import authApi from "../api/auth";
import driversApi from "../api/drivers";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "MALE",
  });
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    name: "",
    phone: "",
    gender: "MALE",
    carId: "",
  });
  const { getAll, deleteDriver, updateDriver, setCar } = driversApi;
  const { registerDriver } = authApi;

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const data = await getAll({ page: 0, size: 10 });
    setDrivers(data.content);
  };

  const deleteDriverEvent = async (id) => {
    await deleteDriver(id);
    fetchDrivers();
  };

  const updateDriverEvent = async (row) => {
    setUpdateFormData({
      ...updateFormData,
      id: row.id,
      name: row.name,
      phone: row.phone,
      carId: row.carId,
      gender: row.gender,
    });
    setUpdateOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 180 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "carId", headerName: "Car Id", width: 100 },
    { field: "createdAt", headerName: "Created At", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => {
              updateDriverEvent(params.row);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => deleteDriverEvent(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleSubmit = async () => {
    await registerDriver(formData);
    fetchDrivers();
    setOpen(false);
  };

  const handleUpdateSubmit = async () => {
    const updateData = {
      name: updateFormData.name,
      phone: updateFormData.phone,
      gender: updateFormData.gender,
    };
    await updateDriver(updateFormData.id, updateData);
    if (updateFormData.carId != "") {
      await setCar(updateFormData.id, { carId: updateFormData.carId });
    }
    fetchDrivers();
    setUpdateOpen(false);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Drivers Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Driver
        </Button>
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={drivers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          sx={{ minWidth: 1400 }}
        />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Driver</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>Update Driver</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={updateFormData.name}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={updateFormData.phone}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    phone: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Car Id"
                value={updateFormData.carId}
                disabled={updateFormData.carId}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    carId: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Gender"
                value={updateFormData.gender}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    gender: e.target.value,
                  })
                }
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Drivers;
