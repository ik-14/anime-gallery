import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

export default function InfoPage() {
  const { infoId } = useParams()
  const [animeData, setAnimeData] = useState()
  useEffect(() => {
    fetch("https://consumet-api-wine.vercel.app/anime/zoro/info?id=" + infoId)
    .then(res => res.json())
    .then(data => setAnimeData(data))
  }, [])
  

  animeData ? console.log(animeData) : console.log('first')
  return (
    <>
      {animeData ? (
        <div>
          <h1 style={{ color: "greenyellow" }}>{animeData.title}</h1>
          <br></br>
          <h1>Episodes</h1>
          <br></br>
          {animeData.episodes.map((current, index) => (
            <div key={index}>
              <NavLink to={`/watch/${current.id}`}>{current.title}</NavLink>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
