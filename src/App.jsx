import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import FeedbackPage from './components/Feedback/Feedback';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log("Credentials: ", credentialResponseDecoded);
    if (credentialResponseDecoded) {
      setIsAuthenticated(true);
    }
  };

  return (
    <React.Fragment>
    <Router>
    <Routes>
      <Route path="/" element={!isAuthenticated ? <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isAuthenticated ? <FeedbackPage /> : <Navigate to="/" />} />
    </Routes>
  </Router>
  </React.Fragment>
  )
}

export default App












  {/* <GoogleLogin
    onSuccess={credentialResponse => {
      var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
      console.log("Credentials: ", credentialResponseDecoded)
      if(credentialResponseDecoded) {
        setIsAuthenticated(true);
      }
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  /> */}