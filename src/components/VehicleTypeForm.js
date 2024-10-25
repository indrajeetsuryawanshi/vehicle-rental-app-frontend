import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VehicleTypeForm = ({ formData, onChange }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const fetchedTypes = formData.wheels === '2' ? ['Bike', 'Scooter'] : ['Car', 'Truck'];
      setVehicleTypes(fetchedTypes);
    };

    fetchVehicleTypes();
  }, [formData.wheels]);

  const handleNext = () => {
    if (formData.vehicleType) {
      navigate('/vehicle-model');
    } else {
      setError(true);
    }
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        value={formData.vehicleType}
        onChange={(e) => onChange('vehicleType', e.target.value)}
      >
        {vehicleTypes.map((type, index) => (
          <FormControlLabel key={index} value={type} control={<Radio />} label={type} />
        ))}
      </RadioGroup>
      {error && <p className="text-red-500">Please select a vehicle type</p>}
      <Button onClick={handleNext} variant="contained" color="primary" className="mt-4">
        Next
      </Button>
    </FormControl>
  );
};

export default VehicleTypeForm;
