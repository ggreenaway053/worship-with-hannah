import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";
import { getLyrics } from 'genius-lyrics-api';

import SongCard from './SongCard';
import Lyrics from './Lyrics';

function SongList() {

  let access_token = 'wR19ZxPZhYROjJrovH-ccNZNR6BeUuwy7Riu8IE_8kTJi18U8vp0xkOuOoBMvRD6';

  const [songs, setSongs] = useState([]); // this is for the list
  const [selectedSongId, setSelectedSongId] = useState(null); // this is to grab the card details
  const [selectedLyrics, setLyrics] = useState([]); // this is to grab the lyrics

  // grabs songs from Genius
  const fetchSongs = async (searchTerm) => {
    if (!searchTerm) return;

    const response = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(searchTerm)}&access_token=${access_token}`);
    const songsData = await response.json();
      setSongs(songsData.response.hits);
  };

  // this deals with the submission of the input box. fetchSongs is the API call
  const handleSubmit = (event) => {
    event.preventDefault();

    if( document.querySelector('.song_search .song_card') ) document.getElementById('song_info').innerHTML = '';

    if( document.getElementById("search").value !== undefined && document.getElementById("search").value !== '' && document.getElementById("search").value !== null ){
      fetchSongs(document.getElementById("search").value);
    }
  };

  // get the lyrics via genius-lyrics-api
  const grabLyrics = async (url) => {
    if (!url) return;
    getLyrics(url).then((lyrics) => setLyrics(lyrics) )
  };

  // set the song clicked from the list
  const handleListItemClick = (songId, url) => {
    setSelectedSongId(songId);
    grabLyrics(url);

  };

  return (
    <Row className="mt-5 mb-4">
      <Col lg="6">
        <div className="position-sticky search_area">
          <form id="search_songs" className="form-floating form-group position-relative" onSubmit={handleSubmit}>
            <input className="form-control" type="text" id="search" name="search" placeholder="Search for a song name or artist" />
            <label htmlFor="search">Search for a song name or artist</label>

            <button type="submit" className="submit"><FaArrowRight/></button>
          </form>

          <div id="search_results" className="mb-4">
            {songs.map((song, i) => (
              <div key={i} className="item" onClick={() => handleListItemClick(song.result.id, song.result.url)}>
                <p className="mb-0">{song.result.full_title}</p>
                <p className="mb-0"><small>{song.result.release_date_for_display}</small></p>
              </div>
            ))}
          </div>
          <div id="song_info">
            {selectedSongId && <SongCard song_id={selectedSongId} access_token={access_token} />}
          </div>
        </div>
      </Col>

      <Col lg="6" className="lyrics">
        {selectedLyrics && <Lyrics lyrics={selectedLyrics} />}
      </Col>
    </Row>
  );
}

export default SongList;