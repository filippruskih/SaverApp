import React from 'react';
import "../App.css";
import Section from '../HOC/Section';
import aboutImage from '../assets/about.jpg';

const about = () => {
  return (
    <Section id='about'>
      <div className='container pt-2 pb-5'>
        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Our </span>Company
          </h3>
          <h6 className='aboutsection'>
            Individualised quality service that meets the total needs of the
            user to aid in saving money at the end of their billing period.
          </h6>
        </div>
        <div className='section-content'>
          <div className='row'>
            <div style={{ display: 'inline-block', width: '30%', margin: '0 auto' }}>
              <div className='aboutImage'>
                <img src={aboutImage} alt='about company' />
              </div>
            </div>
            <div style={{ display: 'inline-block', width: '30%', margin: '0 auto' }}>
              <h3 className='about-title'>About us</h3>
              <div className='about-description'>
                <p>
                  Saver was developed in 2023 by Filipp Ruskih, a final year student at the University of Galway as part of his four year course and this was for his final year project to develop an app to allow users to see their energy consumption and see how they can save money on their bills in the future
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default about;
