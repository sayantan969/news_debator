import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './assets/components/NavigationBar';
import Home from './pages/Home';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';
import Registration from './pages/Registration';
import  { useState } from 'react';

function App() {
  const [authToken, setAuthToken] = useState('');

  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-users" element={<TopUsers authToken={authToken} />} />
          <Route path="/trending-posts" element={<TrendingPosts authToken={authToken} />} />
          <Route path="/feed" element={<Feed authToken={authToken} />} />
          <Route path="/registration" element={<Registration setAuthToken={setAuthToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
