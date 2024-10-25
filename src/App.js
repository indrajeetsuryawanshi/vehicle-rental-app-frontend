import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import NameForm from './components/NameForm';
import WheelsForm from './components/WheelsForm';
import VehicleTypeForm from './components/VehicleTypeForm';
import VehicleModelForm from './components/VehicleModelForm';


const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleModel: '',
    dateRange: null,
  });

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameForm formData={formData} onChange={handleFormChange} />} />
        <Route path="/wheels" element={<WheelsForm formData={formData} onChange={handleFormChange} />} />
        <Route path="/vehicle-type" element={<VehicleTypeForm formData={formData} onChange={handleFormChange} />} />
        <Route path="/vehicle-model" element={<VehicleModelForm formData={formData} onChange={handleFormChange} />} />
      </Routes>
    </Router>
  );
};

export default App;
