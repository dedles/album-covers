import './App.scss';
import { useEffect, useState } from 'react';
const baseParams = "http://demo.subsonic.org/rest"
const apiCreds = 'u=guest&p=guest&v=1.12.0&c=test&f=json'

function InfoDisplay({album}){
  const {name} = album
  const [songs, setSongs] = useState(null);
  useEffect(() => {
    fetch(`${baseParams}/getAlbum?${apiCreds}&id=${album.id}`)
      .then(response => response.json())
      .then(data => {
        const {album: details} = data['subsonic-response'];
        setSongs(details.song)
      })
  }, album);

  return (
    <div className='albumDetails'>
      <h2>
        {name} 
      </h2>
      <table>
        <tr>
          <th>#</th>
          <th>Track</th>
        </tr>
        {songs && songs.map((song) => {
          return <tr key={song.title}>
            <td>{song.track}</td>
            <td>{song.title}</td>
          </tr>
        })}
        
      </table>
    </div>
  )
}

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albums, setAlbums] = useState(null);


  useEffect(() => {
    const params = "http://demo.subsonic.org/rest/getAlbumList2?u=guest&p=guest&v=1.12.0&c=test&type=newest&f=json";
    fetch(params)
    .then(response => response.json())
    .then(data => {
      const {albumList2 } = data['subsonic-response']
      setAlbums(albumList2?.album)
      setSelectedAlbum(0)
    })
    .catch(err => {
      console.error(err);
    });
  }, [])

  if(!albums){
    return null;
  }

  console.log('albums: ', albums)

  return(
    <div className='albumSelector'>
      <div className='topBar'>  
        <div className='arrow'>&lArr;</div>
        <div className='arrow'>&rArr;</div>
        {albums.map(album => {
          return <div className='imgContainer'>
            <img src={`${baseParams}/getCoverArt?${apiCreds}&id=${album.id}`} />
          </div>
        })}
      </div>

      <InfoDisplay album={albums[selectedAlbum]} />
    </div>
  )
}

export default App;
