import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListingPage from './containers/JobListingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;