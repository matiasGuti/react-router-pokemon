import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? 'nav active' : 'nav');

  return (
    <header>
      <img src='/pokemon-logo.png' alt='Icono de pokemon' />
      <div className='navigation-container'>
        <NavLink className={setActiveClass} to='/'>
          Home
        </NavLink>
        <NavLink className={setActiveClass} to='/pokemon'>
          Pokemon
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
