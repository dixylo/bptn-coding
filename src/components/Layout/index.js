import { Outlet, NavLink } from 'react-router-dom';
import './styles.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to='/' className={({ isActive }) => isActive ? 'active' : undefined}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/likes' className={({ isActive }) => isActive ? 'active' : undefined}>
              Likes
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
