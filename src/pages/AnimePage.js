import React, { useEffect, useState } from 'react'
import {useParams, Link, useLocation} from 'react-router-dom'

export default function AnimePage() {

  const [animeData, setAnimeData] = useState([])
  const {id} = useParams()

  useEffect(() => {
    fetch(`https://api.consumet.org/meta/anilist/info/${id}`)
    .then((res => res.json()))
    .then((data) => setAnimeData(data))
  }, [])
  
  console.log(animeData)
  return (
    <div>{id}</div>
  )
}
