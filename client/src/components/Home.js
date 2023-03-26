import React from 'react';
import "../App.css";
import Section from '../HOC/Section';
import bgImage from '../assets/home_bg.jpg';
import Link from './UI/Link/Link';

const home = () => {
  return (
    <Section id='home'>
      <div>
        <div
          className='home-content p-5'
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className='intro container text-center text-light'>
            <h1 className='title'>WELCOME</h1>
            <h2 className='sub-title mb-4'>
              Welcome to SAVER, where we meet all of your energy needs and help you save money by consulting you,
              showing you your energy usage and give you hints on how to save energy consumption.
            </h2>
            <Link classes='btn btn-dark rounded-1' target='about'>
              Learn More
            </Link><span></span>
            <Link target='contact' classes='btn btn-light text-dark rounded-1'>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default home;
