import React from 'react';
import Section from './Section';

const mapMarker = () => {
  //code for the map of the IT building in UoG
  // place id generated via google map and with google api keys services
  return (
    <Section id='map'>
      <div>
        <iframe
          title='mapMarker'
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ0Z_FNvKWW0gR70NyDQNZEsA&key=AIzaSyAApQvSKZa7ESwnY3TP-ubykNWVL4KA2C4"
          width='100%'
          height='450'
          frameBorder='0'
          style={{ border: 0, marginBottom: '-7px' }}
          allowFullScreen
        />
      </div>
    </Section>
  );
};

export default mapMarker;
