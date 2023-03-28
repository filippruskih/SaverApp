import React from 'react';
import "../App.css";

const section = props => {
  // takes in a component id and any child element, when rendered it will generate a section with the ID of it 
  // used on dashboard for navbar - relocates user to section and used in CSS file
  return <section id={props.id}>{props.children}</section>;
};

export default section;
