import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const TrendingPosts = ({ authToken }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Attach the authentication token if available
    if (authToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }

    const fetchTrendingPosts = async () => {
      try {
        // Fetch list of users
        const usersResponse = await axiosInstance.get('/users');
        const users = usersResponse.data.users; // Expected format: { "1": "Name", ... }
        const userIds = Object.keys(users);

        let maxCommentCount = 0;
        const trending = [];

        // For each user, fetch posts and then comments count for each post
        for (const userId of userIds) {
          const postsResponse = await axiosInstance.get(`/users/${userId}/posts`);
          const posts = postsResponse.data.posts;
          console.log(posts)
          for (const post of posts) {
            const commentsResponse = await axiosInstance.get(`/posts/${post.id}/comments`);
            const comments = commentsResponse.data.comments;
            const commentCount = comments.length;

            // If the current post has more comments than previous ones,
            // reset trending array; if equal, add it.
            if (commentCount > maxCommentCount) {
              maxCommentCount = commentCount;
              trending.length = 0;
              trending.push({ ...post, commentCount, userName: users[userId] });
            } else if (commentCount === maxCommentCount) {
              trending.push({ ...post, commentCount, userName: users[userId] });
            }
          }
        }
        console.log(trending)
        setTrendingPosts(trending);
      } catch (err) {
        console.error(err);
        setError('Failed to load trending posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, [authToken]);

  if (loading)
    return (
      <div className="container mt-4">
        <p>Loading trending posts...</p>
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
      <h1>Trending Posts</h1>
      {trendingPosts.length === 0 ? (
        <p>No trending posts found.</p>
      ) : (
        trendingPosts.map((post) => (
          <div key={post.id} className="card mb-3">
            <div className="card-header">
              Post ID: {post.id} by {post.userName}
            </div>
            <div className="card-body">
              <p className="card-text">{post.content}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Comments: {post.commentCount}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TrendingPosts;
