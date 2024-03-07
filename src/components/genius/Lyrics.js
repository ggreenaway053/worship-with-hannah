import React, { useState, useEffect } from 'react';

// GET A SPECIFIC SONG :)
function Lyrics(props){
  const [lyricData, setLyrics] = useState(null);

  useEffect(() => {
    setLyrics(props.lyrics);
    // document.getElementById("search_results").innerHTML = '';

  }, [props.lyrics]);

  return (
    <div className="song_card">
      {lyricData != null && lyricData != '' && lyricData != undefined ? (
        <div className="mt-4 mt-lg-0">
          <blockquote>{lyricData}</blockquote>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
export default Lyrics;