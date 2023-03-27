import React, { useState, useEffect } from 'react';
import Link1 from '../Link/Link';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "../../SidebarData";
import { IconContext } from "react-icons";
import myImage from "../../lightmodecopy.png";


const Nav = () => {
  const [navClass, setNavClass] = useState('');
  const [toggeledNav, settoggeledNav] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const buttonStyle = {
    backgroundImage: `url(${myImage})`,
    width: '25px',
    height: '35px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '12px', 
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let navClass = '';
      if (window.scrollY >= 200) {
        navClass = 'scrolled';
      }
      setNavClass(navClass);
    });
  }, []);


  return (
    <nav className={`navbar navbar-expand-md bg-light ${navClass}`}>
      <div className='container'>
      <IconContext.Provider value={{ color: "black" }}>
        <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
        <a className='navbar-brand' href='/dashboard'>
          <span>SAVER</span>
          <i className='fas fa-circle ml-1' />
        </a>
        <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return 'open';
            return '';
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return 'show';
            return '';
          })()}`}
        >
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link1 target='home' offset={-120} classes='nav-link'>
                Home
              </Link1>
            </li>
            <li className='nav-item'>
              <Link1 target='about' classes='nav-link'>
                About
              </Link1>
            </li>
            <li className='nav-item'>
              <Link1 target='services' classes='nav-link'>
                Services
              </Link1>
            </li>
            <li className='nav-item'>
              <Link1 target='blog' classes='nav-link'>
                Blog
              </Link1>
            </li>
            <li className='nav-item'>
              <Link1 target='contact' classes='nav-link'>
                Contact
              </Link1>
            </li>
          </ul>
        </div>
        <div>
            <button className="lightbtnn" style={buttonStyle} onClick={toggleTheme}></button>
          </div>
      </div>
    </nav>
  );
};

export default Nav;
