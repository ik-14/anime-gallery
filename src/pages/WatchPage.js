import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";

export default function WatchPage() {

  const { watchId } = useParams();
  const [stream, setStream] = useState()
  const [subtitles, setSubtitles] = useState()
  
  useEffect(() => {
    fetch("https://consumet-api-wine.vercel.app/anime/zoro/watch?episodeId=" + watchId)
    .then(res => res.json())
    .then(data => setStream(data))
  }, [])

  useEffect(() => {
    stream ? stream.subtitles.map(current => (
      current.lang === 'English' ? setSubtitles(current.url) : null
    )) : console.log(null)
  }, [stream])
  
  console.log(subtitles)

  return (
    <>
      {stream ? (
        <div className="videoCont">
          <ReactPlayer
            url={stream.sources[3].url}
            controls
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  crossOrigin: "true",
                },
                tracks: [
                  {
                    kind: "subtitles",
                    src: subtitles,
                    srcLang: "en",
                    default: true,
                  },
                ],
              },
            }}
          />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
