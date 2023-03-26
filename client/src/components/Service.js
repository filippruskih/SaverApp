import React from 'react';
import "../App.css";
import Section from '../HOC/Section';

const Service = () => {
  return (
    <Section id='services'>
      <div className='container pt-2 pb-5'>
        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Our </span>Services
          </h3>
          <h6 className='aboutsection'>
          "Saver" is an innovative web application designed to help users monitor their energy consumption in real-time and provide tips and recommendations to save energy. 
          </h6>
        </div>
        <div className='section-content'>
          <div className='row'>
            <div className='col-md-6 col-lg-4 mb-3'>
              <div className='service-box d-flex'>
                <div className='service-icon mr-4'>
                  <i className='fas fa-briefcase' />
                </div>
                <div className='service-body'>
                  <h5 className='service-title'>Business Planning</h5>
                  <p className='service-description'>
                  Business planning for an energy consumption monitoring app involves defining the target market, conducting market research, creating a revenue model, developing a marketing strategy, building the app, and establishing partnerships with energy companies, all while focusing on sustainability and energy efficiency to differentiate from competitors.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-4 mb-3'>
              <div className='service-box d-flex'>
                <div className='service-icon mr-4'>
                  <i className='fas fa-chart-bar' />
                </div>
                <div className='service-body'>
                  <h5 className='service-title'>Product Marketing</h5>
                  <p className='service-description'>
                  Product marketing for an energy consumption monitoring app involves highlighting its features, benefits, and unique selling proposition, such as real-time monitoring, personalized insights, and cost savings. It also involves creating a brand identity, targeting environmentally conscious consumers, and utilizing social media, email marketing, and influencer outreach to reach a wider audience.
                    </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-4 mb-3'>
              <div className='service-box d-flex'>
                <div className='service-icon mr-4'>
                  <i className='fas fa-fist-raised' />
                </div>
                <div className='service-body'>
                  <h5 className='service-title'>Risk Management</h5>
                  <p className='service-description'>
                  Risk management for an energy consumption monitoring app involves identifying potential risks such as data breaches, system failures, or changes in regulatory requirements. It also involves developing mitigation plans, implementing robust security measures, maintaining data privacy, and regularly updating the app to ensure compliance with the latest standards and regulations.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-4 mb-3'>
              <div className='service-box d-flex'>
                <div className='service-icon mr-4'>
                  <i className='far fa-paper-plane' />
                </div>
                <div className='service-body'>
                  <h5 className='service-title'>Market Research</h5>
                  <p className='service-description'>
                  Market research for an energy consumption monitoring app involves analyzing the target audience, identifying customer needs, and understanding market trends and competitors. It also involves gathering data on consumer behaviors, energy consumption patterns, and technological advancements, to create a product that meets the demands of the market and provides a competitive advantage.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-4 mb-3'>
              <div className='service-box d-flex'>
                <div className='service-icon mr-4'>
                  <i className='fas fa-gem' />
                </div>
                <div className='service-body'>
                  <h5 className='service-title'>Business Financing</h5>
                  <p className='service-description'>
                  Business financing for an energy consumption monitoring app involves creating a detailed financial plan that includes initial costs such as research, development, and marketing expenses, as well as ongoing costs such as server maintenance and personnel. It also involves identifying potential sources of funding, such as venture capital, crowdfunding, or loans, to ensure sufficient capital to launch and grow the business.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-4 mb-3'>
              <div className='service-box d-flex'>
                <div className='service-icon mr-4'>
                  <i className='far fa-life-ring' />
                </div>
                <div className='service-body'>
                  <h5 className='service-title'>Support Team</h5>
                  <p className='service-description'>
                  A support team for an energy consumption monitoring app is essential to ensure customer satisfaction, provide technical assistance, and resolve any issues or concerns. The team should have excellent communication skills, be knowledgeable about the app's features and functionalities, and provide timely responses to inquiries through various channels such as email, phone, or chat support.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Service;
