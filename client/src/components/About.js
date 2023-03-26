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
            Individualized quality care that meets the total needs of the
            patient Individualized quality care that quality care that
            Individualized quality care that meets the total.
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
                  "Saver" is an innovative web application designed to help users monitor their energy consumption in real-time and provide tips and recommendations to save energy. The app provides users with an easy-to-use interface to monitor their energy consumption and track their energy usage patterns over time. With Saver, users can view detailed reports on their energy consumption, including insights on the most energy-intensive appliances and areas in their home.
                </p>
                <p>
                Saver also provides personalized tips and recommendations to help users reduce their energy consumption and save money on their energy bills. The app uses advanced algorithms to analyze the user's energy consumption patterns and suggests changes to their daily routines that can lead to significant energy savings. Saver also provides real-time alerts and notifications to remind users to turn off lights or appliances when they are not in use.
                  </p>
                  <p>
                  Saver is an essential tool for anyone who wants to reduce their energy consumption and save money on their energy bills. With its intuitive interface, personalized tips, and real-time monitoring, Saver makes it easy for users to take control of their energy consumption and make smarter energy choices.
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
