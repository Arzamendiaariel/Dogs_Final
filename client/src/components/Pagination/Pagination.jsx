import React from "react";
import styles from "./Pagination.module.css"

export default function Pagination({ dogsPerPage, totalAmountOfDogs, paginationChanger }) {

  const pageNumbers = [];

  for (var i = 1; i <= Math.ceil(totalAmountOfDogs / dogsPerPage); i++) {

    pageNumbers.push(i);
  }
  return (
      <nav className={styles.nav}>
        <ul className="flex">
          {pageNumbers.length && pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button
                  className={styles.paginationBtn}
                  onClick={() => paginationChanger(number)}
                >
                  {number}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    )
}