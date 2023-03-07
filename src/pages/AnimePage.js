import React, { useEffect, useRef, useState } from 'react'
import {useParams} from 'react-router-dom'

export default function AnimePage() {
  const [animeData, setAnimeData] = useState([])
  const {id} = useParams()
  const episodeCont = useRef()
  

  useEffect(() => {
    fetch(`https://api.consumet.org/meta/anilist/info/${id}`)
    .then((res => res.json()))
    .then((data) => setAnimeData(data))
  }, [])
  

animeData.episodes ? console.log(animeData.episodes[0]) : console.log('first')

  return (
    <>
      {animeData.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className='animePage'>
          <header className="animeHeader">
            <img src={animeData.cover} />
            <h1>{animeData.title?.english}</h1>
          </header>
          <div className='episodes'>
            {animeData.episodes
              ? animeData.episodes.map((current, index) => (
                <div key={index} className='episodeBox'>
                  <h3>{current.title}</h3>
                </div>
              ))
              : null}
          </div>
        </div>
      )}
    </>
  );
}
