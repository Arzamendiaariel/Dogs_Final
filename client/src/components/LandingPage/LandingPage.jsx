import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={s.container}>
      <video autoPlay loop muted className={s.bgVideo}>
        <source src="https://www.dropbox.com/home/Henry?preview=dogVideo.mp4" type="video/mp4" />
      </video>
      <Link to="/home">
        <button className={s.enterBtn}>ENTER</button>
      </Link>
    </div>
  );
};

export default LandingPage;
