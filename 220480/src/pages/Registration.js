import React, { useState } from 'react';
import { getAuthToken } from '../api/auth';

const Registration = ({ setAuthToken }) => {
  const [authData, setAuthData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthentication = async () => {
    setLoading(true);
    setError('');
    try {
      // Use your pre-existing credentials (already registered)
      const authDetails = {
        companyName: "BML Munjal University",
        clientID: "6a258ee1-76de-4d57-97d4-74c063570545",
        clientSecret: "XquKkupPZnptxzlD",
        ownerName: "Aditya Agarwal",
        ownerEmail: "aditya.agarwal.22cse@bmu.edu.in",
        rollNo: "220480"
      };

      // Call the Authorization Token API
      const authResponse = await getAuthToken(authDetails);
      setAuthData(authResponse);

      // Immediately pass the token to the parent (App component)
      setAuthToken(authResponse.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Authentication Token Retrieval</h1>
      <button className="btn btn-primary" onClick={handleAuthentication} disabled={loading}>
        {loading ? 'Processing...' : 'Get Authentication Token'}
      </button>
      {error && <div className="mt-3 alert alert-danger">{error}</div>}
      {authData && (
        <div className="mt-3">
          <h4>Authentication Token</h4>
          <pre>{JSON.stringify(authData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Registration;
