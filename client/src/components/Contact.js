import React, { useState } from 'react';
import "../App.css";
import emailjs from 'emailjs-com';
import Section from './Section';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_88pdqqe', 'template_sf5hipn', {
      from_name: name,
      from_email: email,
      message: message,
    }, 'zA5ES10eDHwL5yleO')
      .then(() => {
        alert('Message sent successfully!');
      }, (error) => {
        alert('Failed to send the message. ' + error.text);
      });
  };

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
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='contactinput'
                  aria-describedby='emailHelp'
                  placeholder='Enter Name...'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='contactinput'
                  aria-describedby='emailHelp'
                  placeholder='Enter email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <textarea
                  className='contactinput'
                  rows='3'
                  placeholder='Enter Message...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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

export default Contact;
