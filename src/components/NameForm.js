import React, { useState } from 'react';
import { Button, TextField, Grid, Box, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NameForm = ({ formData, onChange }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (formData.firstName && formData.lastName) {
      onChange('firstName', '');  
      onChange('lastName', '');    
      navigate('/wheels');
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
      <FormControl sx={{ width: '50%', maxWidth: '600px', padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <Grid container direction="column" alignItems="center">
        <h1>First, what's your name?</h1>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            error={error && !formData.firstName}
            helperText={error && !formData.firstName ? "First name is required" : ""}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            error={error && !formData.lastName}
            helperText={error && !formData.lastName ? "Last name is required" : ""}
            margin="normal"
            fullWidth
          />
          <Button 
            onClick={handleNext} 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 2 }}
          >
            Next
          </Button>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default NameForm;
