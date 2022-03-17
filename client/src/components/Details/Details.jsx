import React,{ useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails } from "../../redux/actions";
import styles from "./Details.module.css"

export default function DogDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getDogDetails(id))
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.dogDetails);
  console.log(myDog);

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
      <div className={`contenedor ${styles.detailsContainer}`}>
        <div className="grilla">
          <div>
            <img src={myDog.image} alt="" />
          </div>
          <div>
            <h4 className="special-heading">Name:</h4>
            <p>{myDog.name}</p>
            <h4 className="special-heading">Weight:</h4>
            <p>{myDog.weight} kgs</p>
            <h4 className="special-heading">Height:</h4>
            <p>{myDog.height} cms</p>
            <h4 className="special-heading">Life Span:</h4>
            <p>{myDog.life_span}</p>
            <h4 className="special-heading">Temperament:</h4>
            <p>{myDog.temperament}</p>
          </div>
        </div>
      </div>
      
      <div>
        
      </div>
      
    </div>
  )
}
