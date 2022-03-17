import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ children }) => {
  return (
    <div>
      <nav className={`${styles.titleBar} flex`}>
        <h2 className="special-heading">PI-Henry Dogs</h2>
        <div>
          <Link to="/home">
            <button className={`boton ${styles.linkBtn}`}>Home</button>
          </Link>
          <Link to="/dog">
            <button className={`boton ${styles.linkBtn}`}>Create your own breed</button>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default NavBar;
