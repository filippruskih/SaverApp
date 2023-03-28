import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Section from './Section';
import bgImage from '../assets/facts_bg.jpg';

const Facts = () => {
  return (
    <Section id='facts'>
      <div
        className='facts-container'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='container pt-5 pb-4'>
          <div className='row'>
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-users' />
              </div>
              <h4 className='factstext'>12780</h4>
              <h5 className='factstext'>Active Households</h5>
            </div>
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-grin-beam' />
              </div>
              <h4 className='factstext'>50K+</h4>
              <h5 className='factstext'>Happy Clients</h5>
            </div>
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-project-diagram' />
              </div>
              <h4 className='factstext'>€3,239,027</h4>
              <h5 className='factstext'>Savings Nationwide</h5>
            </div>
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-trophy' />
              </div>
              <h4 className='factstext'>7 Global Awards</h4>
              <h5 className='factstext'>Awards</h5>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Facts;
