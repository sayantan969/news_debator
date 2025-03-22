const express = require("express");
const dotenv = require("dotenv").config()
const axiosInstance = require("./axiosInstance");

const PORT = process.env.PORT || 3003;

const app = express();
app.use(express.json());

const authDetails = {
    companyName: "BML Munjal University",
    clientID: "6a258ee1-76de-4d57-97d4-74c063570545",
    clientSecret: "XquKkupPZnptxzlD",
    ownerName: "Aditya Agarwal",
    ownerEmail: "aditya.agarwal.22cse@bmu.edu.in",
    rollNo: "220480"
  };

app.get("/users",async(req,res)=>{
    let token = await fetch("http://20.244.56.144/test/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(authDetails)})
    console.log(token)
    try{
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }catch(e){
      
    }
    
        const usersResponse = await fetch(process.env.SERVER_URI+'/users',{headers:{"Authorization":`Bearer ${token}`}}).then((data)=>data.json).then((data)=>data);
        const users = usersResponse.users; // Expected format: { "1": "Name", ... }
        const userIds = Object.keys(users);

        // Fetch posts for each user concurrently
        const postsPromises = userIds.map(async (userId) => {
          const postsResponse = await fetch(process.env.SERVER_URI+`/users/${userId}/posts`,{headers:{"Authorization":`Bearer ${token}`}});
          return { id: userId, name: users[userId], count: postsResponse.data.posts.length };
        });

        const usersPosts = await Promise.all(postsPromises);
        // Sort users by post count in descending order and take the top five
        const sortedUsers = usersPosts.sort((a, b) => b.count - a.count).slice(0, 5);
        return res.json(sortedUsers);
})

app.get("/posts",async(req,res)=>{
    let type = req.query.type;
    const usersResponse = await axiosInstance.get('/users');
    const users = usersResponse.data.users; // Expected format: { "1": "Name", ... }
    const userIds = Object.keys(users);
    if(type==="popular"){
        try{
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
            return res.json(trending);
        }catch(e){
            res.status(404).json("Something went wrong");
        }
    }else{
        let allPosts = [];
        for (const userId of userIds) {
            const postsResponse = await axiosInstance.get(`/users/${userId}/posts`);
            const posts = postsResponse.data.posts;
            posts.forEach((el,i)=>{
                allPosts.push(el);
            })
        }
        let resPosts = allPosts.slice(0,5);
        return res.json(resPosts);
    }

})

app.listen(PORT,()=>{
    console.log("Server running on",PORT)
})