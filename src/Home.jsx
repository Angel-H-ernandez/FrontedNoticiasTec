import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import './Home.css';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.post('https://backnodecisneros.onrender.com/getNoticias');
        setArticles(response.data);
        console.log('Fetched articles:', response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>GameltaNews</h1>
        <nav className="home-nav">
          <a href="#">News</a>
          <a href="#">Hardware</a>
          <a href="#">Gaming</a>
          <a href="#">Mobile</a>
          <a href="#">Finance</a>
          <a href="#">Software</a>
          <a href="#">Deals</a>
          <a href="#">Reviews</a>
          <a href="#">How To</a>
        </nav>
      </header>
      <main className="home-main">
        {articles.length > 0 && (
          <section className="featured-article">
            <ArticleCard 
              title={articles[0].titulo} 
              description={articles[0].sinopsis} 
              body={articles[0].cuerpoNoticia}
              imageUrl={articles[0].imagen}
            />
          </section>
        )}
        <section className="articles-grid">
          {articles.slice(1).map((article, index) => (
            <ArticleCard 
              key={index}
              title={article.titulo} 
              description={article.sinopsis} 
              body={article.cuerpoNoticia}
              imageUrl={article.imagen}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
