import { Routes, Route, Link, NavLink} from 'react-router-dom';
import { useAuth } from '../pages/auth/auth';

const Navbar = () => {
    const auth = useAuth()
    return ( 
        <nav className="navbar">
            <h1>Safe Space</h1>
            <div className="links">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/profile">profile</NavLink>
      {!auth.user && (
        <NavLink to='/login' >
          Login
        </NavLink>
      )}

    
            </div>
        </nav>
     );
}
 
export default Navbar;