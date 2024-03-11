import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { main, meta, favourites } from "../../content_option";

import SongCard from '../../components/genius/SongCard';
import SearchSongs from '../../components/genius/SearchSongs';

(function() {
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
      var args = slice.call(arguments);
      var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host) {
          args[1] = cors_api_url + args[1];
      }
      return open.apply(this, args);
  };
})();

export const Home = () => {

  let access_token = 'wR19ZxPZhYROjJrovH-ccNZNR6BeUuwy7Riu8IE_8kTJi18U8vp0xkOuOoBMvRD6';
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title} | Lyric Finder</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <Container key="1" className="banner">
        <Row>
          <Col lg="10" className="content">
            {main.title}
            {main.content}

            <br />
            <p class="mb-0">Beause this is a dev project, I use cors-anywhere to grab the lyrics. Thusfore, you'll need to temporarily enable the extension, by going here: <a href="http://cors-anywhere.herokuapp.com/" target="_blank">http://cors-anywhere.herokuapp.com/</a></p>       
          </Col>
        </Row>

        <SearchSongs />
        
      </Container>

      <Container key="2" id="favourites" className="pt-lg-5">
        <Row>
          <Col lg="10" className="content mb-4">
            {favourites.title}            
          </Col>

          {favourites.songs.map((data, i) => {
          return (
            <Col lg="4" className="mb-4">
              <SongCard key={data.song_id} type="favourite" access_token={access_token} title={data.title} song_id={data.song_id}/>
            </Col>
          );
        })}
        </Row>
      </Container>

    </HelmetProvider>
  );
};
