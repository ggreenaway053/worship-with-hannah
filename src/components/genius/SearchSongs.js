import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";
import { getLyrics } from 'genius-lyrics-api';

import SongCard from './SongCard';
import Lyrics from './Lyrics';

function SongList() {

  let access_token = 'wR19ZxPZhYROjJrovH-ccNZNR6BeUuwy7Riu8IE_8kTJi18U8vp0xkOuOoBMvRD6';

  const [searchTerm, setSearchTerm] = useState(''); // set search term

  const [songs, setSongs] = useState([]); // this is for the list
  const [selectedSongId, setSelectedSongId] = useState(null); // this is to grab the card details
  const [selectedLyrics, setLyrics] = useState([]); // this is to grab the lyrics

  // grabs songs from Genius
  const fetchSongs = async (search_term) => {
    if (!search_term) return;

    const response = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(search_term)}&access_token=${access_token}`);
    const songsData = await response.json();
      setSongs(songsData.response.hits);
  };

  // this deals with the submission of the input box. fetchSongs is the API call
  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchTerm(document.getElementById("search").value);

    if( document.getElementById("search").value !== undefined && document.getElementById("search").value !== '' && document.getElementById("search").value !== null ){
      fetchSongs(searchTerm);
    }
  };

  // set the song clicked from the list - then get the lyrics from genius-lyrics-api
  const handleListItemClick = (songId, url) => {
    if (!url) return;

    // resets the search area - means we can have multiple searches!
    document.getElementById("search").value = '';
    document.getElementById('submit').click();
    setSongs([]);

    setSelectedSongId(songId);
    getLyrics('https://thingproxy.freeboard.io/fetch/'+url).then((lyrics) => setLyrics(lyrics) )
  };

  // on change of input keep updating the search term
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Row className="mt-5 mb-4">
      <Col lg="6">
        <div className="position-sticky search_area">
          <form id="search_songs" name="search_songs" className="form-floating form-group position-relative" onSubmit={handleSubmit}>
            <input className="form-control" type="text" id="search" name="search" placeholder="Search for a song name or artist" onChange={handleInputChange} />
            <label htmlFor="search">Search for a song name or artist</label>

            <button id="submit" ype="submit" className="submit"><FaArrowRight/></button>
          </form>

          <div id="search_results" className="mb-4">
          {searchTerm ? (
            songs.map((song, i) => (
              <div key={i} className="item" onClick={() => handleListItemClick(song.result.id, song.result.url)}>
                <p className="mb-0">{song.result.full_title}</p>
                <p className="mb-0"><small>{song.result.release_date_for_display}</small></p>
              </div>
            ))
          ) : (
            <span></span>
          )}
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