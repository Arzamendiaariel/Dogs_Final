import React from 'react';

import styles from './NotFound.module.css';
import notFoundImg from './images/notFound.png';

export default function NotFound() {
  return (
    <div>
      <div className=" centrar-texto">
        <h2>Ruta no encontrada</h2>
        <img className={styles.img} src={notFoundImg} alt="" />
      </div>
    </div>
  );
}
