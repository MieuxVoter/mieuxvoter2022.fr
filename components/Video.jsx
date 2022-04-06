import ReactPlayer from 'react-player/youtube'

export default function Player({id}) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${id}`}
      playing={true}
      config={{
        youtube: {
          playerVars: {
            autoplay: 0,
            controls: 1
          }
        }
      }}
    />
  )
}
