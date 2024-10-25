import React, { useState, useEffect } from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl, TextField, Snackbar, Alert, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const VehicleModelForm = ({ formData }) => {
  const location = useLocation();
  const { vehicleTypeId } = location.state || {};
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [fname, setFName] = useState(formData.firstName);
  const [lname, setLName] = useState(formData.lastName);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error'); 

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${vehicleTypeId}`);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    if (vehicleTypeId) {
      fetchVehicles();
    }
  }, [vehicleTypeId]);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedVehicle && startDate && endDate) {
      try {
        const formattedStartDate = startDate.format('YYYY-MM-DD');
        const formattedEndDate = endDate.format('YYYY-MM-DD');

        const bookingResponse = await axios.post('http://localhost:5000/api/book', {
          firstName: fname,
          lastName: lname,
          vehicleId: selectedVehicle,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });

        if (bookingResponse.status === 201) {
          setSnackbarMessage('Vehicle booked successfully');
          setAlertSeverity('success'); 
          setTimeout(() => {
            navigate('/');
          }, 2000); 
        } else {
          setSnackbarMessage('Failed to book the vehicle. Please try again.');
          setAlertSeverity('error');
        }
      } catch (error) {
        console.error('Error booking vehicle:', error);
        setSnackbarMessage("This vehicle is already booked on these dates.");
        setAlertSeverity('error');
      }
      setSnackbarOpen(true); 
    } else {
      setError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ width: '50%', maxWidth: '600px', padding: 2, boxShadow: 3, borderRadius: 2 }}>
          {vehicles.length > 0 && (
            <>
              <InputLabel id="vehicle-model-label">Select Vehicle Model</InputLabel>
              <Select
                labelId="vehicle-model-label"
                value={selectedVehicle}
                onChange={handleVehicleChange}
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.model}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
          />

          {error && <p className="text-red-500">Please select a vehicle model and dates</p>}

          <Button onClick={handleSubmit} variant="contained" color="primary" className="mt-4">
            Book Vehicle
          </Button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </FormControl>
      </LocalizationProvider>
    </Box>
  );
};

export default VehicleModelForm;
