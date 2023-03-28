import React from 'react';
import '../App.css';
import Link from './Link';

const footer = () => {
  return (
    <footer className=''>
      <div className='container text-dark pt-5'>
        <div className='row'>
          <div className='col-sm-6 col-md-6 col-lg-4 mb-5'>
            <div className='footer-title'>
              <h6>About Us</h6>
            </div>
            <div className='footer-content'>
              <p>
                <small className='text-muted'>
                Saver was developed in 2023 by Filipp Ruskih, a final year student at the University of Galway as part of his four year course and this was for his final year project to develop an app to allow users to see their energy consumption and see how they can save money on their bills in the future
                </small>
              </p>
              <button className='btn btn-sm btn-primary rounded-0'>
                Learn more
              </button>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-lg-2 mb-5'>
            <div className='footer-title'>
              <h6>Quick Links</h6>
            </div>
            <div className='footer-content'>
              <ul className='list-group quick-links'>
                <li>
                  <Link target='home' offset={-120}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link target='about'>About</Link>
                </li>
                <li>
                  <Link target='services'>Services</Link>
                </li>
                <li>
                  <Link target='blog'>Blog</Link>
                </li>
                <li>
                  <Link target='contact'>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
            <div className='footer-title'>
              <h6>Latest News</h6>
            </div>
            <div className='footer-content'>
              <p>
                <small className='text-muted'>
                  Amazon Alexa Connectivity coming late 2023!
                </small>
              </p>
              <p>
                <small className='text-muted'>
                  Partnering with Ireland's biggest energy provider to provide up to date cost
                </small>
              </p>
              <p>
                <small className='text-muted'></small>
              </p>
            </div>
          </div>
          <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
            <div className='footer-title'>
              <h6>Contact Us</h6>
            </div>
            <div className='footer-content'>
              <p className='text-muted'>
                <small>Address : IT Building, fourth year lab, University of Galway</small>
              </p>
              <p className='text-muted'>
                <small>Phone : +353 (0) 85 1917 563</small>
              </p>
              <p className='text-muted'>
                <small>E-mail : filippruskih@gmail.com</small>
              </p>
              <div className='social-media mt-4'>
                <a href='!#' className='text-light'>
                  <i className='fab fa-facebook-f mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-twitter mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-instagram mr-4' />
                </a>
                <a href='!#' className='text-dark'>
                  <i className='fab fa-github' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-footer pt-3 pb-3 text-center'>
        <small>© SAVER - All Right Reserved</small>
      </div>
    </footer>
  );
};

export default footer;
