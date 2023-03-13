import React, { useEffect, useState } from 'react'
import {NavLink, useParams} from 'react-router-dom'

export default function InfoPage() {
  const [results, setResults] = useState([])
  const {id} = useParams()
  

  useEffect(() => {
    fetch(`https://consumet-api-wine.vercel.app/anime/zoro/${id}`)
      .then((res) => res.json())
      .then((data) => setResults(data.results));
  }, [])
  
  results ? console.log(results) : console.log('hi')

  return (
    <>
    {results.length === 0 ? <h1>loading</h1> : <div className='resultsCont'>
      {results.map((current, index) => {
        const posterImg = current.image
        return (
          <NavLink to={`/info/${current.id}`}>
            <img src={posterImg} className='resultsImg'/>
          </NavLink>
        )
      }
      )}
      </div>}
    </>
  )


}
