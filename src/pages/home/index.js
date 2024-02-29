import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { main, meta } from "../../content_option";
import Card from "../../components/Card";

export const Home = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title} | Lyric Finder</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <Container className="banner">
        <Row>
          <Col lg="10" className="content mb-4">
            {main.title}
            {main.content}

            <div className="form-floating form-group mt-5">
              <input className="form-control" type="search" id="search" placeholder="Search for a song name or artist" />
              <label className="ms-2" for="name">Search for a song name or artist</label>
            </div>
            
          </Col>
        </Row>
      </Container>

    </HelmetProvider>
  );
};
