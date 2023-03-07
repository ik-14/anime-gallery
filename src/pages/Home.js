import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../styles.css'
import {NavLink} from 'react-router-dom'


export default function Home() {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  function handleWindowResize() {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }
  useEffect(() => {
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize);
    
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


    window.onmousemove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const decimalX = mouseX / window.innerWidth;
      const decimalY = mouseY / window.innerHeight;
      
      const maxX = width - window.innerWidth;
      const maxY = height - window.innerHeight;
      
      const finalX = maxX * decimalX * -1;
      const finalY = maxY * decimalY * -1;
        
      if (window.location.href === "http://localhost:3000/") {
        ref.current.animate(
          {
            transform: `translate(${finalX}px, ${finalY}px)`,
          },
          {
            duration: 3500,
          }
        ) 
      }

    };


  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("https://api.consumet.org/meta/anilist/popular")
      .then((res) => res.json())
      .then((data) => (data.results))
      .then((newData) => setPosters(newData));
  }, []);

  return (
    <div className="App">
      <div id="container" ref={ref}>
        {posters.map((current, index) => (

          <div className="tile" key={index} style={{backgroundColor: `${current.color}`}}>
            <NavLink to={`anime/${current.id}`}>
              <img src={current.image} style={{borderRadius: '13px'}} />
            </NavLink>
          </div>
          
        ))}
      </div>
    </div>
  );
}
