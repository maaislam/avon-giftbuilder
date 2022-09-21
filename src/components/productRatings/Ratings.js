import React, { useEffect, useState } from 'react';
import './Ratings.css';

const Ratings = ({ prodId }) => {
  const [starsData, setStarsData] = useState('');

  useEffect(() => {
    const getStars = async () => {
      const options = {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      };

      const ratingData = await fetch(
        `https://api.yotpo.com/products/${process.env.REACT_APP_YOTPO_PRIVATE_KEY}/${prodId}/bottomline`,
        options
      );
      const jsonRatingsData = await ratingData.json();
      const yotpoRatingsData = jsonRatingsData.response.bottomline;
      const ratingStars = (ratingData) => {
        const { average_score, total_reviews } = ratingData;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          const rounderRating = Math.floor(average_score);
          if (i <= rounderRating) {
            stars.push(<span key={i} className='yotpo-icon'></span>);
          } else if (i === rounderRating + 1 && (average_score * 10) % 5) {
            stars.push(<span key={i} className='yotpo-icon half-star'></span>);
          } else {
            stars.push(<span key={i} className='yotpo-icon empty-star'></span>);
          }
        }
        setStarsData({ stars, total_reviews });
      };

      ratingStars(yotpoRatingsData);
    };
    getStars();
  }, [prodId]);

  return (
    <div className='yotpo bottomLine'>
      <div className='yotpo-display-wrapper'>
        <div className='standalon-bottomline'>
          <div className='yotpo-bottomlie pull-left'>
            <div className='yotpo-stars'>{starsData.stars}</div>
            <span className='yotpo-rev-count'>{starsData.total_reviews} Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
