import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, RadioGroup, Radio, MenuItem, Select, InputLabel, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WheelsForm = ({ formData, onChange }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [selectedWheels, setSelectedWheels] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);  
  const [selectedVehicleType, setSelectedVehicleType] = useState('');  

  const handleWheelsChange = async (event) => {
    const wheels = event.target.value;
    setSelectedWheels(wheels);

    try {
      console.log(formData,"dataaaaaaaaaaaaaa")
      const response = await axios.get(`http://localhost:5000/api/vehicle-types/wheels/${wheels}`);
      console.log(response.data,"Vehicle types data");
      setVehicleTypes(response.data);  
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    }
  };

  const handleVehicleTypeChange = (event) => {
    setSelectedVehicleType(event.target.value);
  };

  const handleNext = () => {
    if (selectedWheels && selectedVehicleType) {
      onChange('wheels', selectedWheels);
      onChange('vehicleType', selectedVehicleType);
      navigate('/vehicle-model', { state: { vehicleTypeId: selectedVehicleType } });
    } else {
      setError(true);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <Box sx={{ width: '50%', maxWidth: '600px', padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <h1>Select vehicle type</h1>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup onChange={handleWheelsChange} value={selectedWheels}>
            <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
          </RadioGroup>

          {vehicleTypes.length > 0 && (
            <>
              <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
              <Select
                labelId="vehicle-type-label"
                value={selectedVehicleType}
                onChange={handleVehicleTypeChange}
                fullWidth
              >
                {vehicleTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.type}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          {error && <p className="text-red-500">Please select both wheels and vehicle type</p>}

          <Button onClick={handleNext} variant="contained" color="primary" sx={{ mt: 4 }}>
            Next
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default WheelsForm;
