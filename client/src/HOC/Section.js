import React from 'react';
import "../App.css";

const section = props => {
  return <section id={props.id}>{props.children}</section>;
};

export default section;
