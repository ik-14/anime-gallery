import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../styles.css'
import {NavLink} from 'react-router-dom'
import { META } from "@consumet/extensions";


export default function Home() {
  const anilist = new META.Anilist();
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
  const searchUrl = "https://api.consumet.org/anime/zoro/";

  useEffect(() => {
    fetch("https://consumet-api-wine.vercel.app/meta/anilist/popular")
      .then((res) => res.json())
      .then((data) => data.results)
      .then((newData) => setPosters(newData));
  }, []);

  return (
    <div className="App">
      <div id="container" ref={ref}>
        {console.log(posters)}
        {posters.map((current, index) => (
          <div
            className="tile"
            key={index}
            style={{ backgroundColor: `${current.color}` }}
          >
            <NavLink to={`results/${current.title.userPreferred}`}>
              <img src={current.image} style={{ borderRadius: "13px" }} />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
