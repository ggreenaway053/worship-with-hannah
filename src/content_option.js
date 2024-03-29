const meta = {
  title: "Worship with Hannah",
  description: "Get the lyrics you need to any worship song, right at your fingertips.  No need for complicated searches, just type in the title and sing along  with ease. Let the music inspire you, and we'll provide the words.",
};

const main = {
  title: <h1 className="mb-5">Find the words that lift <span className="reveal">your spirit</span> - or <a href="#favourites">view Hannah’s favourites</a>.</h1>,
  content: <h3>Get the lyrics you need to any worship song, <span className="reveal">right at your fingertips</span>.  No need for complicated searches, just type in the title and sing along  with ease. Let the music inspire you, and we'll provide the words.</h3>
};

const favourites = {
  title: <h2 className="mb-0">Our Hannah's favourites</h2>,
  songs: [
    {
      title: "Holy Water by Tasha Cobbs & We The Kingdom",
      song_id: 5373494
    },
    {
      title: "Worthy is the Lamb by Hillsong Worship",
      song_id: 1976985
    },
    {
      title: "Promises by Maverick City Music",
      song_id: 5464454
    }
  ]
}

export {
  meta,
  main,
  favourites
};