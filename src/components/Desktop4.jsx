import React from 'react';
import './style4.css';
import arrow from '../assets/arrow.png';

export const Desktop4 = () => {
  return (
    <div className="desktop4">
      <div className="div">
        
        <div className="car-prediction-section">
          <h1 className="car-prediction-title">Used Car Price Prediction</h1>
          
          <div className="project-details">
            <p className="project-description">
              Cleaned and normalized the dataset, engineering new features for improved accuracy.
            </p>
            
            <p className="project-feature">
              Experimented with multiple machine learning models to identify the best-performing one.
            </p>
            
            <p className="project-link">
              <a href="https://car-price-prediction-kappa.vercel.app/">Live model</a>
            </p>
            
            <p className="project-link">
              <a href="https://github.com/Harry-Joseph9387/CPP-Backend">dataset preparation github </a>
            </p>
          </div>
        </div>
        
        <h2 className='project-number'>#Project01</h2>

      </div>
    </div>
  );
};

