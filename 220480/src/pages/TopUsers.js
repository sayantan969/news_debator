import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const TopUsers = ({ authToken }) => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // If an auth token is passed, set it on the axios instance
    if (authToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    
    const fetchUsersAndPosts = async () => {
      try {
        // Fetch list of users
        const usersResponse = await axiosInstance.get('/users');
        const users = usersResponse.data.users; // Expected format: { "1": "Name", ... }
        const userIds = Object.keys(users);

        // Fetch posts for each user concurrently
        const postsPromises = userIds.map(async (userId) => {
          const postsResponse = await axiosInstance.get(`/users/${userId}/posts`);
          return { id: userId, name: users[userId], count: postsResponse.data.posts.length };
        });

        const usersPosts = await Promise.all(postsPromises);
        // Sort users by post count in descending order and take the top five
        const sortedUsers = usersPosts.sort((a, b) => b.count - a.count).slice(0, 5);
        setTopUsers(sortedUsers);
      } catch (err) {
        console.error(err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, [authToken]);

  if (loading)
    return (
      <div className="container mt-4">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container mt-4">
      <h1>Top Users</h1>
      <ul className="list-group">
        {topUsers.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name}
            <span className="badge bg-primary rounded-pill">{user.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
