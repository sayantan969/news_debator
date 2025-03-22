import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Feed = ({ authToken }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch posts for all users
  const fetchFeedPosts = async () => {
    try {
      const usersResponse = await axiosInstance.get('/users');
      const users = usersResponse.data.users; // Format: { "1": "Name", ... }
      const userIds = Object.keys(users);
      let allPosts = [];

      // Fetch posts for each user concurrently
      const postsPromises = userIds.map(async (userId) => {
        try {
          const response = await axiosInstance.get(`/users/${userId}/posts`);
          // Add the corresponding userName to each post
          return response.data.posts.map(post => ({
            ...post,
            userName: users[userId]
          }));
        } catch {
          return [];
        }
      });

      const postsPerUser = await Promise.all(postsPromises);
      postsPerUser.forEach(userPosts => {
        allPosts = allPosts.concat(userPosts);
      });

      // Sort posts by descending order of id (assumed proxy for recency)
      allPosts.sort((a, b) => b.id - a.id);
      return allPosts;
    } catch (err) {
      throw new Error('Failed to fetch feed posts');
    }
  };

  useEffect(() => {
    // Set the auth token header if provided
    if (authToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }

    const updateFeed = async () => {
      try {
        const newPosts = await fetchFeedPosts();
        // Deduplicate posts by id using a Map
        setPosts(prevPosts => {
          const postsMap = new Map();
          newPosts.forEach(post => postsMap.set(post.id, post));
          prevPosts.forEach(post => postsMap.set(post.id, post));
          return Array.from(postsMap.values()).sort((a, b) => b.id - a.id);
        });
        setLoading(false);
      } catch (err) {
        setError('Error loading feed posts. Please try again later.');
        setLoading(false);
      }
    };

    updateFeed();
    // Poll for new posts every 5 seconds
    const intervalId = setInterval(updateFeed, 5000);
    return () => clearInterval(intervalId);
  }, [authToken]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Real-Time Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{post.userName}</h5>
              <p className="card-text">{post.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
