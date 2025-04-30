import React from "react";
import "./style1.css";
import arrow from '../assets/arrow.png';
import cvThumbnail from '../assets/x1.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

export const Desktop1 = () => {
  return (
    <div className="desktop1">
      <div className="intro-text">
        <h1 className="intro-text-h1">Hey i am</h1>
        <div className="intro-name-container">
          <h2>Harry</h2>
          <h3>Joseph</h3>
        </div>
        <div className="social-links">
          <div className="icon-bg" style={{ cursor: 'pointer' }} onClick={()=>{window.open("https://github.com/Harry-Joseph9387", "_blank")}}>
            <FaGithub className='icon'/>
          </div>
          <div className="icon-bg" style={{ cursor: 'pointer' }} onClick={()=>{window.open("https://www.linkedin.com/in/harry-joseph-a68568318/", "_blank")}}>
            <FaLinkedin className='icon'/>
          </div>
          <div className="icon-bg" style={{ cursor: 'pointer' }} onClick={()=>{window.open("/Resume.pdf", "_blank")}}>
            <HiDocumentText className='icon'/>
          </div>
        </div>
        <div className="email-phone">
          <div className="email">harryjoseph9387@gmail.com</div>
          
          <div className="phone">+91 9539933369</div>
        </div>
      </div>
      <div className="profile-img-container">
        <img className="profile-img" src={cvThumbnail} alt="" />
      </div>
    </div>
  );
};
