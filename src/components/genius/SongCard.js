import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

// GET A SPECIFIC SONG :)
function SongCard(props){
  const [songData, setSongData] = useState(null);

  // set the song clicked from the list
  const updateSearch = (e) => {
    e.preventDefault();
    
    document.getElementById("search").value = e.currentTarget.getAttribute('name');
    setTimeout(function(){
      document.getElementById('submit').click();
    }, 300);
  };

  useEffect(() => {
    const fetchSong = async () => {
      const response = await fetch(`https://api.genius.com/songs/${props.song_id}?access_token=${props.access_token}`);
      const song = await response.json();
      setSongData(song.response.song);
    };
    fetchSong();

  }, [props.song_id]);

  return (
    <div className="h-100 song_card">
      {songData ? (
        <div className='h-100'>
          <div className="image">
            <img src={songData.song_art_image_url} alt={songData.title} title={songData.title} loading="lazy" />
          </div>
          <div className="content d-flex justify-content-center">
            <h5>{songData.title}</h5>
            <p className="mb-0">{songData.artist_names}</p>
            <p><small>Release Date: {songData.release_date}</small></p>

            {props.type == 'favourite' ? ( // if this is a favourites, run this :)
            <a href="#" onClick={updateSearch} name={songData.full_title}>get lyrics</a>
            ): (
              <a href={songData.url} target="_blank" name={songData.full_title}>view on Genius</a>
            )}


          </div>
        </div>
      ) : (
        <div><p className="mb-0">Loading song data...</p></div>
      )}
    </div>
  );
}
export default SongCard;