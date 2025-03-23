import React from "react";
import '../styles/NewsCard.css';

const NewsCard = ({article}) => {
    const {title,description,urlToImage,url,publishedAt,source} = article;

return (
    <div className="news-card">
        { urlToImage && (
            <img src={urlToImage} alt ={title} className="news-card__image"/>
        )}

        <div className="news-card__content">
            <h2 className="news-card__title">{title}</h2>
            <p className="news-card__description">{description} </p>
            <p className="news-card__info"> 
            <span>{new Date(publishedAt).toLocaleDateString()}</span>
            <span>{source.name}</span>
            </p>
            <a href= {url} target="_blank" rel="noopener noreferrer" className="news-card__link">
                read more
            </a>
            
        </div>


    </div>
);


};

export default NewsCard;
