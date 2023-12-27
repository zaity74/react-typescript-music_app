import {
  BsFillPlayFill, BsFillPauseFill, 
  BsSkipEndFill, BsSkipStartFill, 
  BsSquareFill, BsShuffle, BsRepeat, BsRepeat1} from 'react-icons/bs'

import React, { useState, useEffect, useRef, SyntheticEvent} from "react";
import { NewLineKind } from 'typescript';

interface IProps {
  song_list: {
    name: string;
    url: string;
    artiste: string;
    bpm: number;
    price: number;
    type: string;
    vibe: string;
  }[];
  isPlaying: boolean[];
  setIsPlaying: (booleanValue: boolean[]) => void;
  currentSong: number | null ;
  setCurrentSong: (index: number | null) => void;
  updatedIsPlaying: boolean[];
  audioRefs: (HTMLAudioElement | null)[];
}

const Player = ({ 
    song_list, 
    isPlaying, 
    setIsPlaying, 
    currentSong, 
    setCurrentSong, 
    updatedIsPlaying,
    audioRefs
    }: IProps ) => {

  // State 
  const [isRepeat, setIsRepeat] = useState<string>('none');
  const [randomSong, setRandomSong] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [listDuration, setListDuration] = useState<number[]>(new Array(song_list.length).fill(0));
  const [duration, setDuration] = useState<number | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  

  // New constantes
  updatedIsPlaying = [...isPlaying];


  // Page load
  useEffect(() => {
    playedSong(currentSong);

    if(isRepeat === 'none'){
        songEndedStop(currentSong);
    }
    repeatSong();

  }, [
    currentSong,
    isPlaying, 
    /* isRepeat, currentTime */
  ]);
  
  

  const playedSong = (index: number | null) => {
    /* 
      DOCUMENTATION : 
      -------------
      1. The playedSong methods is use to play the currentSong 
      if isPlaying state is true. 
      2. So on page load, the playedSong methods is lunch if 
      currentSong state is non null. 
      3. When the the tooglePlay method is click it affect the 
      index clicked to currentIndex. 
    */
    if (index !== null) {
      const audioEl = audioRefs[index];
      if (audioEl) {
        if (isPlaying[index]) {
          audioEl.play();
          if(isRepeat === 'none'){
            songEndedStop(index);
          }
        } else {
          audioEl.pause();
        }
      }
    }
  };

  const songEndedStop = (index: number | null) => {
    /* 
      DOCUMENTATION : 
      --------------
      1. songEndedStop method,set isPlaying state to false 
      when the audio of the current index song is ended
      2. On page load, if a track is played, we find the index 
      and if the track ended, it set isPlaying to false, 
      to toggle the play icone. 
    */
    if (index !== null) {
        const audioEl = audioRefs[index];
        if (audioEl) {
          audioEl.addEventListener('ended', () => {
            updatedIsPlaying[index] = false;
            setIsPlaying(updatedIsPlaying);
            pausedSong(index); // Arrêtez la chanson ici
          });
        }
    }
  };
  

  const changeRepeatMode = () => {
      setIsRepeat('Loop All');
      if (isRepeat === 'Loop All') {
        setIsRepeat('Loop Once');
      } else if (isRepeat === 'Loop Once') {
        setIsRepeat('none');
      }
  };

  const setRandomMode = () => {
    setRandomSong(!randomSong);
  }

  const repeatSong = () => {
    // Loop
    if(isRepeat === 'Loop All'){
        if(currentSong !== null){
          if(randomSong){
            // intervall random Index
            const minIndex = 0; 
            const maxIndex = song_list.length;
    
            // create random Index
            const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
            let newIndex = randomIndex;
            
            const audioEl = audioRefs[newIndex];
            // if random is égale to current index add + 1
            if(randomIndex === currentSong){
              newIndex = currentSong + 1;
            }
            const initAudioEl = audioRefs[currentSong];
            if(initAudioEl && audioEl){

                // audio ended event
                initAudioEl.addEventListener('ended', () => {
                  if (newIndex < song_list.length) {
                    audioEl.currentTime = 0;
                    initAudioEl.currentTime = 0;
                    const updatedIsPlaying = [...isPlaying];
                    updatedIsPlaying[newIndex] = true; // Jouez la nouvelle chanson
                    updatedIsPlaying[currentSong] = false; // Stopper la chanon précédente
                    pausedSong(currentSong);
              
                    setCurrentSong(newIndex);
                    setIsPlaying(updatedIsPlaying);
                  }

                }
              )}
            
    
          }else{
            const audioEl = audioRefs[currentSong];
            let nextIndex = currentSong + 1;
            if(nextIndex === song_list.length){
              nextIndex = 0;
              updatedIsPlaying[currentSong] = false;
            }
            const nextAudioEl = audioRefs[nextIndex];
            if(audioEl && nextAudioEl){
              // audio ended event 
              audioEl.addEventListener('ended', () => {
                // check if index < song_list.length
                if(nextIndex <= song_list.length){
                    nextAudioEl.currentTime = 0;
                    updatedIsPlaying[nextIndex] = true; // Jouez la nouvelle chanson
                    updatedIsPlaying[nextIndex - 1] = false; // Stopper la chanon précédente
                    setCurrentSong(nextIndex);
                    setIsPlaying(updatedIsPlaying);
                }
                });
            }
          }
        }
    }
    if(isRepeat === 'Loop Once'){
      if(currentSong !== null){
        const audioEl = audioRefs[currentSong];
        if(audioEl){
          audioEl.addEventListener('ended', () => {
            audioEl.currentTime = 0;
            updatedIsPlaying[currentSong] = true; // Jouez la nouvelle chanson
            setIsPlaying(updatedIsPlaying);
            setCurrentSong(currentSong);
          })
        }
      }
    }

  }

  const pausedSong = (index: number | null) => {
    /* 
        DOCUMENTATION : 
        -------------
        1. The tooglePlay methods change isPlaying state to true or fale
        So if it's true, it lunch the playedSong methods and the song index start. 
        But for other song index who are not played it's has to be paused. 
        2. This method pause the song index who are not played. 
    */
    if (index !== null) {
      const audioEl = audioRefs[index];
      if (audioEl) {
        audioEl.pause();
      }
    }
  };

  const togglePlay = (index: number) => {
    /*
      DOCUMENTATION : 
      -------------
      1. set index as a parameters to refer to the song index
      2. set updatedIsPlaying as an array of boolean 
      with the length of song_list with default false value
      3. onClick on togglePlay, find the index clicked in the 
      updateIsPlaying array and give it !invere value. 
      4. for other song set value to false and audioEl.currentTime 
      to 0. 
      5. affect updateIsPlaying to isPlaying state. 
      6. affect index to currentSong.  
      7. If isPlaying is true it will lunch the playedSong method
    */
    updatedIsPlaying[index] = !updatedIsPlaying[index];

    if (currentSong !== null && currentSong !== index) {
      pausedSong(currentSong);
      updatedIsPlaying[currentSong] = false;
      const audioEl = audioRefs[currentSong];
      if(audioEl){
        audioEl.currentTime = 0;
      }
    }
    setCurrentSong(index);
    setIsPlaying(updatedIsPlaying);
    console.log(isPlaying, 'isPlaying');
  };

  const nextSong = () => {
    if (currentSong !== null) {
      // If random is true
      if(randomSong){
        // intervall random Index
        const minIndex = 0; 
        const maxIndex = song_list.length;

        // create random Index
        const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
        let newIndex = randomIndex;
        const audioEl = audioRefs[newIndex];
        if(randomIndex === currentSong){
          newIndex = currentSong + 1;
        }
        const initAudioEl = audioRefs[currentSong];
        if (newIndex < song_list.length) {
          if(audioEl && initAudioEl){
            audioEl.currentTime = 0;
            initAudioEl.currentTime = 0;
          }
          updatedIsPlaying[newIndex] = true; // Jouez la nouvelle chanson
          updatedIsPlaying[currentSong] = false; // Stopper la chanon précédente
          pausedSong(currentSong);

          setCurrentSong(newIndex);
          setIsPlaying(updatedIsPlaying);
        }

      }else{
        let newIndex = currentSong + 1;
        const initAudioEl = audioRefs[currentSong];
        const audioEl = audioRefs[newIndex];

        if (newIndex < song_list.length) {
          if(audioEl && initAudioEl){
            audioEl.currentTime = 0;
            initAudioEl.currentTime = 0;
          }
          const updatedIsPlaying = [...isPlaying];
          updatedIsPlaying[newIndex] = true; // Jouez la nouvelle chanson
          updatedIsPlaying[newIndex - 1] = false; // Stopper la chanon précédente
          
          pausedSong(newIndex - 1);
          setCurrentSong(newIndex);
          setIsPlaying(updatedIsPlaying);
        }
      }
    }
  };

  const prevSong = () => {
    if (currentSong !== null) {
      // If random is true
      if(randomSong){
        // intervall random Index
        const minIndex = 0; 
        const maxIndex = song_list.length;

        // create random Index
        const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
        let newIndex = randomIndex;
        const audioEl = audioRefs[newIndex];
        if(randomIndex === currentSong){
          newIndex = currentSong - 1;
        }
        const initAudioEl = audioRefs[currentSong];
        if (newIndex >= 0 && newIndex < currentSong) {
          if(audioEl && initAudioEl){
            audioEl.currentTime = 0;
            initAudioEl.currentTime = 0;
          }
          updatedIsPlaying[newIndex] = true; // Jouez la nouvelle chanson
          updatedIsPlaying[currentSong] = false; // Stopper la chanon précédente
          pausedSong(currentSong);
    
          setCurrentSong(newIndex);
          setIsPlaying(updatedIsPlaying);
        }

      }else{
        const prevIndex = currentSong - 1;
        const initAudioEl = audioRefs[currentSong];
        const audioEl = audioRefs[prevIndex];
        if (prevIndex >= 0 && prevIndex < currentSong) {
          if(audioEl && initAudioEl){
            audioEl.currentTime = 0;
            initAudioEl.currentTime = 0;
          }
          updatedIsPlaying[prevIndex] = true; // Jouez la nouvelle chanson
          updatedIsPlaying[prevIndex + 1] = false; // Stopper la chanon précédente
          pausedSong(prevIndex + 1);
    
          setCurrentSong(prevIndex);
          setIsPlaying(updatedIsPlaying);
        }
      }
    }
  };

  const updatePlaybackProgress = (value: number | null) => {
    // Calculate the new currentTime based on the input range value
    if(value !== null){
      if (duration !== null && currentSong !== null) {
        const newCurrentTime = value;
        setCurrentTime(newCurrentTime);
  
        // Update the audio element's currentTime
        const audioEl = audioRefs[currentSong];
        if (audioEl) {
          audioEl.currentTime = newCurrentTime;
        }
      }
    }
  };

  const handleTimeUpdate = (e: SyntheticEvent<EventTarget>, index: number): void => {
    const currTime = (e.target as HTMLMediaElement).currentTime;
    const durr = (e.target as HTMLMediaElement).duration; 
    setCurrentTime(currTime);
    setDuration(durr);
    if(currentTime !== null){
      setPlaybackProgress(currentTime);
    }
  }

/*  
  const handleTimeUpdate = (index: number | null) => {
    return () => {
      if (index !== null) {
        const audioEl = audioRefs[index];
        if (audioEl) {
          setCurrentTime(audioEl.currentTime);
        }
      }
    };
  };
*/

/*
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioElement = e.currentTarget; // Extrait l'élément audio de l'événement
    console.log(audioElement.duration);
    
    if (audioElement) {
      const index = audioRefs.indexOf(audioElement);
      
      if (index < song_list.length && listDuration !== null) {
        updatedDuration[index] = audioElement.duration;
        setListDuration(updatedDuration);
        
        if (currentTime !== null) {
          setPlaybackProgress(currentTime);
        }
      }
    }
  };
*/
  

  function formatTime(timeInSeconds : number | null) {
    if (timeInSeconds !== null) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      return '0:00';
    }
  }

  // Variable 
  const buttonColor = isRepeat === 'Loop All' || isRepeat === 'Loop Once' ? 'blue' : undefined;
  const btnRdmColor = randomSong === true ? 'red' : undefined;

  return (
    <div className='player-section'>
      {song_list.map((song: any, index: number) => (
        index === currentSong && 
        <div className='player-container' key={index}>
          <div className='song-info'>
              <img src={song.image} alt='song image' />
              <div className='info'>
                <h2>{song.name}</h2>
                <p>Artiste: {song.artiste}</p>
              </div>
              <audio 
              style={{display: 'none'}}
              controls ref={(ref) => (audioRefs[index] = ref)}
              preload="metadata"
              onTimeUpdate={(e) => handleTimeUpdate(e, index)}
              onLoadedMetadata={(e) => handleTimeUpdate(e, index)}
              >
                <source src={song.url} type="audio/mp3" />
              </audio>
          </div>
          <div className='controler'>
            <div className='player-control'
            >
              <button style={{ color: btnRdmColor }}>
                <BsShuffle onClick={setRandomMode} />
              </button>
              <button onClick={prevSong}>
                <BsSkipStartFill />
              </button>
              <button onClick={() => togglePlay(index)}>
                {isPlaying[index] ? 
                <BsFillPauseFill /> : <BsFillPlayFill />}
              </button>
              <button onClick={nextSong}>
                <BsSkipEndFill />
              </button>
              <button 
              style={{ color: buttonColor }}
              onClick={changeRepeatMode} 
            >
              {isRepeat === 'none' && <BsRepeat />}
              {isRepeat === 'Loop All' && <BsRepeat />}
              {isRepeat === 'Loop Once' && <BsRepeat1 />}
            </button>
            </div>
            <div className='progress-bar'>
              <input
                  type="range"
                  min={0}
                  max={duration || 0} // Assurez-vous que duration est défini avant de l'utiliser
                  value={playbackProgress}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    setPlaybackProgress(newValue); // au change du curseur 
                    updatePlaybackProgress(newValue);
                  }}
                />
              <p>{formatTime(currentTime)} / {formatTime(listDuration[index])}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Player;