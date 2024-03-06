import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { main, meta, favourites } from "../../content_option";

import SongCard from '../../components/genius/SongCard';
import SearchSongs from '../../components/genius/SearchSongs';

export const Home = () => {

  let access_token = 'wR19ZxPZhYROjJrovH-ccNZNR6BeUuwy7Riu8IE_8kTJi18U8vp0xkOuOoBMvRD6';
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title} | Lyric Finder</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <Container className="banner">
        <Row>
          <Col lg="10" className="content">
            {main.title}
            {main.content}            
          </Col>
        </Row>

        <SearchSongs />
        
      </Container>

      <Container id="favourites" className="pt-5">
        <Row>
          <Col lg="10" className="content mb-4">
            {favourites.title}            
          </Col>

          {favourites.songs.map((data, i) => {
          return (
            <Col lg="4">
              <SongCard key={data.song_id} type="favourite" access_token={access_token} title={data.title} song_id={data.song_id}/>
            </Col>
          );
        })}
        </Row>
      </Container>

    </HelmetProvider>
  );
};
