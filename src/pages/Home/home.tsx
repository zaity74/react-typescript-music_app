import './home.css';
import Songs from '../../componnents/section/songs';
import React, { useState, useEffect } from "react";
import Player from '../../componnents/section/player/player';
// Redux import 
// Hooks

// Interface State
interface IState{
  song_list:{
    name: string,
    url: string, 
    artiste: string,
    bpm: number, 
    price: number, 
    type: string, 
    vibe : string,
    image: string,
  }[],
}


function Home() {
    // State
    const [song, setSong] = useState<IState['song_list']>([
      {
        name: "Quand tout s'enflamme ",
        url: `${process.env.PUBLIC_URL}/audio/audio5.mp3`,
        artiste: 'Gergio x PLK',
        bpm: 120,
        price: 10,
        type: 'Pop',
        vibe: 'Happy',
        image: 'https://i.ytimg.com/vi/Tp27LO1FwSI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCIFRHdw5ka4-SXtl-GnScxK1ILVw'
      },
      {
        name: 'Dark Vader',
        url: `${process.env.PUBLIC_URL}/audio/audio8.mp3`,
        artiste: 'JHus',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://i.ytimg.com/vi/sJS154YfkH4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCFkWFQSgrhsF7gTB3DovbLTErnmg'
      },
      {
        name: 'Spécial',
        url: `${process.env.PUBLIC_URL}/audio/audio6.mp3`,
        artiste: 'Tiakola x Dave',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://i.ytimg.com/vi/-yL2KluWuNo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLALpaitf-ZqBh5zX_CZ0PUW3Y0qhg'
      },
      {
        name: 'Hôtel 5 étoiles',
        url: `${process.env.PUBLIC_URL}/audio/audio7.mp3`,
        artiste: 'Georgio',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://i.ytimg.com/vi/Taxdk2hIeeI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDj8SNYWZWiZy1oNLzzigqy8X_yhA'
      },
      {
        name: 'Saison nouvelle',
        url: `${process.env.PUBLIC_URL}/audio/audio10.mp3`,
        artiste: 'Fred makeABeat',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://source.boomplaymusic.com/group10/M00/07/15/a5dca6f800104681a95d10257b3246c3_464_464.jpg'
      },
      {
        name: 'Nouveau throne',
        url: `${process.env.PUBLIC_URL}/audio/audio11.mp3`,
        artiste: 'Fred makeABeat',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://source.boomplaymusic.com/group10/M00/11/07/434385428dba4b00b3171c381881165d_464_464.jpg'
      },
      {
        name: 'Brazil',
        url: `${process.env.PUBLIC_URL}/audio/audio13.mp3`,
        artiste: 'Fred makeABeat',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://i.ytimg.com/vi/5EyjmdRgw7E/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGD0gZShgMA8=&rs=AOn4CLC_RXLUNfqkQUvzmsd01VKB2qZ-kA'
      },
      {
        name: 'Chill in the summer',
        url: `${process.env.PUBLIC_URL}/audio/audio14.mp3`,
        artiste: 'Fred makeABeat',
        bpm: 90,
        price: 15,
        type: 'Rock',
        vibe: 'Energetic',
        image: 'https://i.ytimg.com/vi/no_rlbiiGf0/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGBMgVyh_MA8=&rs=AOn4CLC0rDYCpNEl2NhNJJHG3uBL1ZMvNA'
      }
    ]);
    const [isPlaying, setIsPlaying] = useState<boolean[]>(new Array(song.length).fill(false)); 
    const [currentSong, setCurrentSong] = useState<number | null>(null);
    const [currentTrack, setCurrentTrack] = useState<number | null>(currentSong);

    // New constantes
    const updatedIsPlaying = [...isPlaying];
    const audioRefs: (HTMLAudioElement | null)[] = [];
    const playerAudio = [...audioRefs];
    
  
    // Page load

    // Events
    
   
    // Variables
  
    return (
      <>
      <div className='home-section'>
        <Songs 
        song_list={song}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong} 
        updatedIsPlaying={updatedIsPlaying}
        
        audioRefs={audioRefs }
        />
        <h1>Player</h1>
        
        {
          <Player 
          song_list={song} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          currentSong={currentSong} 
          setCurrentSong={setCurrentSong}
          updatedIsPlaying={updatedIsPlaying}
          audioRefs={audioRefs}
          /* currentSong, isPlaying */   /> 
        }
      </div>

      </>
    );
  }
  
  export default Home;