import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    return (
      <div className="font-inter fixed top-6 right-0 mr-4 z-50 ">
        <header className="font-inter fixed top-6 right-0 mr-4">
            <Link to="/">
                <a href="#" className="mx-2 p-1 hover:underline transition-all duration-500 ease-in-out">Horários</a>
            </Link>
            <a href="#" className="mx-2 p-1 hover:underline">Comboio</a>
            <a href="#" className="mx-2 p-1 hover:underline">Alerta</a>
        </header>
      </div>
    );
  }
  
  export default Header;
  