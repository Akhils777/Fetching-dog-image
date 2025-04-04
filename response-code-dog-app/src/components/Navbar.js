import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const styles = {
    nav: {
      backgroundColor: '#3B82F6', 
      padding: '1rem',
      color: 'white',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      fontWeight: 'bold',
      fontSize: '1.25rem',
    },
    links: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'text-decoration 0.3s ease',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: 0,
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.brand}>Dog Code Response</div>
        {user ? (
          <div style={styles.links}>
            <Link
              to="/search"
              style={styles.link}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              Search
            </Link>
            <Link
              to="/lists"
              style={styles.link}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              My Lists
            </Link>
            <button
              onClick={onLogout}
              style={styles.button}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/"
            style={styles.link}
            onMouseEnter={e => e.target.style.textDecoration = 'underline'}
            onMouseLeave={e => e.target.style.textDecoration = 'none'}
          >
            
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
