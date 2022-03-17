import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import notFoundImg from "./images/notFound.png";


export default function NotFound() {

  return (
    <div>
      <div className={`${styles.titleBar} flex`}>
        <h2 className="special-heading">PI-Dogs / Juan Canelon</h2>
        {/* <button onClick={e => {handleClick(e)}}>Reload</button> */}
        <div>
          <Link to="/home">
            <button className={`boton ${styles.linkBtn}`}>Home</button>
          </Link>
          <Link to="/dog">
            <button className={`boton ${styles.linkBtn}`}>Create your own breed</button>
          </Link>
        </div>
      </div>
      <div className="contenedor centrar-texto">
        <h2>Ruta no encontrada</h2>
        <img className={styles.img} src={notFoundImg} alt="" />
      </div>
    </div>
  )
}