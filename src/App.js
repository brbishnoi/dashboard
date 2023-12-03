import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Axios from 'axios';  // Import Axios
import EditUser from './Component/EditPage';
import HomePage from './Component/HomePage';
import './App.css'; 

const fetchData = async () => {
  try {
    const response = await Axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData().then(data => setUsers(data));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/edit/:id" element={<EditUser users={users} setUsers={setUsers} />} />
          <Route path="/" element={<HomePage users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
