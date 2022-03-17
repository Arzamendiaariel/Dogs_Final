import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <h2 className="special-heading">PI-Henry Dogs</h2>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/dog">
          <button>Create your own breed</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
