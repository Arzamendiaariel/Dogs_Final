import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"
import landingPageImg from "./images/victor-grabarczyk-2pbnDRhXc6Q-unsplash.jpg"

export default function LandingPage() {
  return (
    <div className={`${styles.body} grilla`}>
      <div className="flex flex-column">
        {/* <h1 className="special-heading">Welcome to PI-Dogs</h1> */}
        <ul className={`special-heading ${styles.heading}`}>
          <li><h1>Who let</h1></li>
          <li><h1>the Dogs out?</h1></li>
        </ul>
        <div className="w-100">
          <div className={`flex flex-start ${styles.landingPageDescription}`}>
            <p>A Dogs PI for Henry</p>
          </div>
        </div>
        <div className="w-100">
          <div className="flex flex-end">
            <Link to='/home'>
              <button className={`boton ${styles.landingPageBtn}`}>Enter</button>
            </Link>
          </div>
        </div>              
      </div>
      <div className={`${styles.dogBg} flex flex-start`}>
        <div className={styles.imgContainer}>
          <img className={styles.dogImg} src={landingPageImg} alt="" />
        </div>
        
        {/* <div className={styles.dogBg}>
          <img src={landingPageImg} alt="" />
        </div> */}
        {/* <div className={styles.dogBg}></div> */}
        
      </div>
    </div>
  );
}