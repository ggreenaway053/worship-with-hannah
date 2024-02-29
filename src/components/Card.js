import React from 'react';
import { Col } from "react-bootstrap";

function Card(props){
  return(
    <Col lg="6" className="mb-5 item">
      <img src={props.img} alt={props.title} className="w-100" />
      <div className="content mt-4">
        <h4>{props.title}</h4>
        <p>{props.type}</p>
      </div>
    </Col>
  );
}
export default Card;