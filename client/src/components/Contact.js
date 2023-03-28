import React from 'react';
import "../App.css";
import Section from './Section';

const contact = () => {
  return (
    <Section id='contact'>
      <div className='container pt-2 pb-5'>
        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Contact </span>Us
          </h3>
          <h6 className='aboutsection'>
            Please feel free to contact us with any queries you may have on the contact form below.
          </h6>
        </div>
        <div className='section-content'>
          <div className='row'>
            <div className='contactcontainer'>
              <form>
                <div className='form-group'>
                  <input
                    type='text'
                    className='contactinput'
                    aria-describedby='emailHelp'
                    placeholder='Enter Name...'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className='contactinput'
                    aria-describedby='emailHelp'
                    placeholder='Enter email...'
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    className='contactinput'
                    rows='3'
                    placeholder='Enter Message...'
                  />
                </div>
                <div className='form-group text-center'>
                  <button className='btn btn-block btn-primary rounded-3 mr-auto ml-auto'>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default contact;
