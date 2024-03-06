import React, { useState, useEffect } from 'react'; 
import { FaExternalLinkAlt } from "react-icons/fa";

function updateSearch(e){
  e.preventDefault();
  alert(e.currentTarget.getAttribute('song_id'));
}

// GET A SPECIFIC SONG :)
function SongCard(props){
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const response = await fetch(`https://api.genius.com/songs/${props.song_id}?access_token=${props.access_token}`);
      const song = await response.json();
      setSongData(song.response.song);
    };
    fetchSong();

    document.getElementById("search_results").innerHTML = '';

  }, [props.song_id]);

  var type;
  if( props.type == 'favourite' ){
    type = <a href="#" onClick={updateSearch} song_id={props.song_id}>get lyrics</a>
  } else{
    type = <a href={props.url} target="_blank">view on Genius <FaExternalLinkAlt /></a>;
  }

  return (
    <div className="mb-4 song_card">
      {songData ? (
        <div>
          <div className="image">
            <img src={songData.song_art_image_url} alt={songData.title} title={songData.title} loading="lazy" />
          </div>
          <div className="content d-flex justify-content-center">
            <h5>{songData.title}</h5>
            <p className="mb-0">{songData.artist_names}</p>
            <p><small>Release Date: {songData.release_date}</small></p>
            {type}
          </div>
        </div>
      ) : (
        <p>Loading song data...</p>
      )}
    </div>
  );
}
export default SongCard;