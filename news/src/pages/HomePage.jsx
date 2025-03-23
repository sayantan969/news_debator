import React,{useState,useEffect} from "react";
import { fetchTopHeadlines } from "../services/newsService";
import '../styles/HomePage.css';
import NewsCard from "../components/NewsCard";

const HomePage = () => {
    const [articles,setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async() =>{
            try {
                const data = await fetchTopHeadlines('us');
                setArticles(data)
            } catch (err) {
                setError('Failed to fetch news.');
                
            } finally{
                setLoading(false);
            }
        };
        getNews();
    }, []);

    if(loading) return <p>
        Loading news ....
    </p>;
    if(error) return <p>{error} </p>;
    
    return (
        <div className="home-page">
          <h1>top Headlines</h1> 
          <div className="news-grid">
            {articles.map((article,index)=> (
                <NewsCard key={index} article={article} />
            ))}
            </div> 
        </div>
    )


}

export default HomePage