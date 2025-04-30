import React from "react";
import "./style5.css";
import arrow from '../assets/arrow.png';

export const Desktop5 = () => {
  return (
    <div className="desktop5">
      <div className="div">
        
        

        <h1 className="project-title">Travel Planner</h1>
        <div className="project-description">
          <p className="">
            Used Held-Karp Algorithm, utilizing Dynamic Programming with
            Bitmasking and Recursion
          </p>

          <p className="">
            Integrated the algorithm with a Flask backend, and a React-based UI
            with Leaflet.js
          </p>

          <div className=""><a href="https://tp-frontend-henna.vercel.app/">Live model</a></div>

          <div className=""><a href="https://github.com/Harry-Joseph9387/TP-backend/tree/main">github repo</a> </div>

        </div>
        <h2 className='project-number'>#Project02</h2>

      </div>
    </div>
  );
};
