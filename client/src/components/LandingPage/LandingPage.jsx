import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
// import video from './images/dogVideo.mp4';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      {/* <video autoPlay loop muted className={styles.bgVideo}>
        <source
          src={video}
          type="video/mp4"
        />
      </video> */}
      <iframe
        autoPlay
        loop
        muted
        className={styles.bgVideo}
        src="https://www.youtube.com/embed/ilVkmmw_35g?autoplay=1&mute=1&loop=3"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; loop; muted"
      ></iframe>
      <Link to="/home">
        <button className={styles.enterBtn}>ENTER Henry-Dog</button>
      </Link>
    </div>
  );
};

export default LandingPage;
