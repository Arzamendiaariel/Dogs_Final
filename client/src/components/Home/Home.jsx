import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsBySource, filterDogsByTemperament, getDogs, getTemperaments, sortByName, sortByWeight } from "../../redux/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";
import notFoundImg from "../NotFound/images/notFound.png"
import bone from "./images/bone.png";

export default function Home() {

  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const allDogsCopy = useSelector((state) => state.allDogs);
  // este hook es lo mismo que usar el mapStateToProps. Con useSelector traeme en esa constante todo lo que esta en el estado de dogs
  // me trae desde el reducer el estado dogs donde están todos los perros
  const allTemperaments = useSelector((state) => state.temperaments);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // here we are setting a state with our first current page and get setState thta controls the page number
  const [dogsPerPage] = useState(8);
  // const [temperamentsSelected, setTemperamentsSelected] = useState([]);
  const [orderByName, setOrderByName] = useState();
  const [orderByWeight, setOrderByWeight] = useState();

  const indexOfLastDogOnPage = currentPage * dogsPerPage;
  const indexOfFirstDogOnPage = indexOfLastDogOnPage - dogsPerPage;

  const currentPageDogs = allDogs.slice(indexOfFirstDogOnPage, indexOfLastDogOnPage);

  const paginationChanger = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]);
  // el segundo argumento es para evitar que se genere un loop infinito de useEffect
  // el segundo argumento puede ser un array vacio pero cuando ese use effect depende de la funcion dispatch es como decirle que siempre y cuando tengas ese dispatch, ejecutalo

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);

  // esto refresca la pagina
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  // Filter By Temperaments

  function handleFilterByTemperaments(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }

  // Filter By Source

  function handleFilterBySource(e) {
    e.preventDefault();
    dispatch(filterDogsBySource(e.target.value));
  }

  // Sort by Name

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrderByName(`${e.target.value}`);
  }

  // Sort by Weight

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrderByWeight(`${e.target.value}`);
  }

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
      <div className={`${styles.filterBar} flex`}>
        <div>
          <select onChange={(e) => handleSortByName(e)} defaultValue="default">
            <option value="default" disabled hidden>Sort by Name</option>
            <option value="nameAscendant">A to Z</option>
            <option value="nameDescendant">Z to A</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => handleSortByWeight(e)} defaultValue="originalOrder">
            <option value="originalOrder" disabled hidden>Sort by Weight</option>
            <option value="weightAscendant">Ascendent</option>
            <option value="weightDescendant">Descendent</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => handleFilterByTemperaments(e)} defaultValue="default">
            <option value="default" disabled hidden>Select Temperament</option>
            {allTemperaments && allTemperaments.map((temperament) => (
              <option key={temperament.id}>{temperament.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select onChange={(e) => handleFilterBySource(e)} defaultValue="default">
            <option value="default" disabled hidden>Select Source</option>
            <option value="all">All</option>
            <option value="onlyFromApi">API</option>
            <option value="onlyFromDb">DB</option>
          </select>
        </div>
        <div>
        <SearchBar />
      </div>
      </div>
      <div className="contenedor">
        {!allDogs.length && !allDogsCopy.length &&
        <div className="centrar-texto">
          <img src={bone} className="bone" alt="" />
          <p>Loading...</p>
        </div>
        }
        {!allDogs.length && allDogsCopy.length > 0 &&
        <div className="centrar-texto">
          <h2>No Dogs Found</h2>
          <img className={styles.imgNotFound} src={notFoundImg} alt="" />
        </div>
        }
        <div className="grilla">
          {
          currentPageDogs && currentPageDogs.map((dog) => {
            return (
                    <Card 
                      id={dog.id}
                      key={dog.id} 
                      name={dog.name} 
                      image={dog.image} 
                      temperament={dog.temperament} weight={dog.weight} 
                    />                    
          )})
        }    
        </div>
      </div>
      
      
      <div>
        {
        allDogs.length > 0 && <Pagination 
          totalAmountOfDogs={allDogs.length}
          dogsPerPage={dogsPerPage}
          paginationChanger={paginationChanger}
        />
        }
        {!allDogs.length && allDogsCopy.length > 0 && 
        <div className="contenedor centrar-texto">
          <p className={styles.noPagination}>no pagination to show</p>
        </div>
        }
      </div>
    </div>
  )
}