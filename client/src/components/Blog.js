import React from 'react';
import Section from './Section';
import blogImage1 from '../assets/blog1.jpg';
import blogImage2 from '../assets/blog2.jpg';
import blogImage3 from '../assets/blog3.jpg';

const Blog = () => {
  return (
    <Section id='blog'>
      <div className='container pt-2 pb-5'>
        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Our </span>Blog
          </h3>
          <h6 className='aboutsection'>
          "Our blog" section for an energy consumption monitoring app would feature informative and engaging articles on energy-saving tips, sustainability, technology trends, and other topics related to energy consumption and environmental protection.
          </h6>
        </div>
        <div className='section-content'>
          <div className='row'>
            <div className='col-lg-4 mb-3'>
              <div className='card rounded-0'>
                <img src={blogImage1} className='card-img-top' alt='Blog 1' />
                <div className='card-body'>
                  <h5 className='card-title'>Amazon Alexa features coming soon!</h5>
                  <p className='card-text'>
                  Alexa, the voice assistant developed by Amazon, has several energy consumption-saving features, such as the ability to control smart home devices, including smart thermostats and smart plugs, which can help users reduce their energy usage. Additionally, Alexa can provide energy-saving tips, track energy usage, and even suggest changes to users' daily routines to optimize energy consumption.
                  </p>
                  <a href='info' className='btn btn-sm btn-primary'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-4 mb-3'>
              <div className='card rounded-0'>
                <img src={blogImage2} className='card-img-top' alt='Blog 2' />
                <div className='card-body'>
                  <h5 className='card-title'>A more in depth graph implementation!</h5>
                  <p className='card-text'>
                    We are currently working on integrating new pie charts, bar charts, histograms and more! this will bring your energy consumption observation to a whole new level. 3D graphs, machine learning algorithms and more! Click read more to see more on this topic.  
                  </p>
                  <a href='/info' className='btn btn-sm btn-primary'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-4 mb-3'>
              <div className='card rounded-0'>
                <img src={blogImage3} className='card-img-top' alt='Blog 3' />
                <div className='card-body'>
                  <h5 className='card-title'>New Business Deal Incoming</h5>
                  <p className='card-text'>
                  We plan to include partnerships with energy companies, utility providers, and smart home device manufacturers to offer the app as a value-added service to their customers. Collaborations with building management companies could provide opportunities for the app to be integrated into smart buildings and homes, offering a comprehensive energy management solution for tenants and homeowners. 
                  </p>
                  <a href='/info' className='btn btn-sm btn-primary'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Blog;
