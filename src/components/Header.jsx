import React from 'react';
// The NavLink from react-router-dom is still needed
import { NavLink } from 'react-router-dom'; 

// The following imports are no longer needed in this component, so we can comment them out.
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';
// import { useAuth } from '../context/AuthContext';

const Header = () => {
  // These hooks are also no longer needed for the public header.
  // const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();

  // This function is for the logout button, which is now hidden.
  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     navigate('/');
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };

  const activeLinkStyle = { color: '#93C5FD', borderBottom: '2px solid #93C5FD' };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold tracking-tight">
          <i className="fas fa-church mr-2"></i>VCM
        </NavLink>
        <div className="flex flex-wrap space-x-4 md:space-x-6 mt-4 md:mt-0 items-center">
          <NavLink to="/" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
          <NavLink to="/im-new" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>I'm New</NavLink>
          <NavLink to="/services" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Programmes</NavLink>
          <NavLink to="/events" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Events</NavLink>
          <NavLink to="/gallery" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Gallery</NavLink>
          <NavLink to="/contact" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Contact</NavLink>
          <NavLink to="/giving" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Giving</NavLink>
          
          {/* CHANGE: The entire block that shows "Admin Login" or "Logout" is now commented out.
            This makes the admin panel access private.
          */}
          {/*
          {isLoggedIn ? (
            <>
              <NavLink to="/admin" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Admin</NavLink>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <NavLink to="/admin" className="nav-link" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Admin Login</NavLink>
          )}
          */}
        </div>
      </nav>
    </header>
  );
};

export default Header;