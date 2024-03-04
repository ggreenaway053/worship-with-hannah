import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";

import { main, meta, favourites } from "../../content_option";
import Card from "../../components/Card";

import { getLyrics, getSongById, searchSong } from 'genius-lyrics-api';

export const Home = () => {

  let access_token = 'RYfER6xATQDTqqbJPp4LoYmclwuMIXqQMRRt34d_aXpot2Hxp1xmOg61LMcgrZmm';

  const genius_search = (e) => {
    e.preventDefault();

    let search_terms =  document.getElementById("search").value;
    document.getElementById("search_results").innerHTML = '';
    if( search_terms != null && search_terms != undefined && search_terms != '' ){
      const search_options = {
        apiKey: access_token,
        title: search_terms,
        artist: search_terms,
        optimizeQuery: true
      };
      searchSong(search_options).then((items) =>
        items.forEach(item => {
          const item_element = document.createElement('div');
          item_element.classList.add("item");
          item_element.innerHTML = item.title;
          document.querySelector('#search_results').appendChild(item_element);
        })
      );
    }
  }

  const grabSong = (song_info) => {
    const id = song_info.id

    const song_options = {
      apiKey: access_token,
      id: id,
      optimizeQuery: true
    }
    
    getSongById(song_options).then((song) =>
      console.log(song)
    );
  }

  // bind search function to form
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search_songs");
    form.addEventListener("submit", genius_search);
  });

  // bind click function to all list items
  document.body.addEventListener( 'click', function ( event ) {
    if( event.target.classList.contains('item') ) {
      grabSong( event.target.innerHTML );
    };
  } );

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

          <Col lg="6" className="song_search mb-4">
            <form id="search_songs" className="form-floating form-group mt-5 position-relative">
              <input className="form-control" type="text" id="search" name="search" placeholder="Search for a song name or artist" />
              <label htmlFor="search">Search for a song name or artist</label>

              <button type="submit" className="submit"><FaArrowRight/></button>
            </form>

            <div id="search_results"></div>
            <div id="song_info"></div>
          </Col>
          <Col lg="6" className="lyrics mb-4">
            <div className="inner">
            </div>
          </Col>
        </Row>
      </Container>

      <Container id="favourites" className="pt-5">
        <Row>
          <Col lg="10" className="content mb-4">
            {favourites.title}            
          </Col>
        </Row>
      </Container>

    </HelmetProvider>
  );
};
