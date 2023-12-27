import '../../pages/Home/home.css';
import {
  BsFillPlayFill, BsFillPauseFill, 
  BsSkipEndFill, BsSkipStartFill, 
  BsSquareFill, BsShuffle, BsRepeat, BsRepeat1} from 'react-icons/bs'

import React, { useState, useEffect, useRef, SyntheticEvent} from "react";
import useAudioController from '../../hooks/useAudioCtrl';
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
  }[], 
  isPlaying: boolean[];
  setIsPlaying: (booleanValue: boolean[]) => void;
  currentSong: number | null ;
  setCurrentSong: (index: number | null) => void;
  updatedIsPlaying: boolean[];
  audioRefs: (HTMLAudioElement | null)[];
}

const Songs = ({ 
  song_list, 
  isPlaying, 
  setIsPlaying,
  currentSong,
  setCurrentSong,
  audioRefs }: IProps) => {

  // State 
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [listDuration, setListDuration] = useState<number[]>(new Array(song_list.length).fill(0));
  const [duration, setDuration] = useState<number | null>(null);
  

  // New constantes
  const updatedIsPlaying = [...isPlaying];
  const canvasRefs: (HTMLCanvasElement | null)[] = [];


 /* 
  const {
    showSongDuration,
  } = useAudioController(
    song_list, 
    audioRefs,
    listDuration
    )
*/


  // Page load
  useEffect(() => {
    //playedSong(currentSong);
    //songEndedStop(currentSong);
  

    // All songs duration 
    const updatedDuration = [...listDuration];
    audioRefs.forEach((audioEl, i) => {
        if (audioEl && audioEl.duration !== 0) {
          audioEl.addEventListener('loadedmetadata', () => {
              updatedDuration[i] = audioEl.duration;
              setListDuration(updatedDuration);
          });
        }
    });

  }, [
    /* isRepeat, currentTime */
  ]);

  /*
  useEffect(() => {
    const audioContext = getAudioContext();
    const analyser = audioContext.createAnalyser();
  
    if (currentSong !== null) {
      const audioElement = audioRefs[currentSong];
      // Vérifiez si l'élément audio est déjà connecté
      if (audioElement !== null && !audioElement.srcObject) {
        const source = audioContext.createMediaElementSource(audioElement as HTMLMediaElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
  
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
  
        const canvas = canvasRefs[currentSong];
        const canvasContext = canvas?.getContext("2d");
  
        if (canvasContext) {
          function draw() {
            analyser.getByteFrequencyData(dataArray);
            if (currentSong !== null && canvasContext !== undefined && canvasContext !== null && canvas !== null) {
              canvasContext.clearRect(0, 0, canvas.width, canvas.height);
              canvasContext.fillStyle = isPlaying[currentSong] ? '#ffffff' : '#27426e';
  
              const barWidth = (canvas.width / bufferLength) * 2.5;
              let x = 0;
  
              for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255.0) * canvas.height;
                canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
              }
            }
          }
  
          function animate() {
            draw();
            requestAnimationFrame(animate);
          }
  
          animate();
  
          return () => {
            audioContext.close();
          };
        }
      }
    }
  }, [audioRefs, canvasRefs, currentSong, isPlaying]);
  */
  let audioContext: AudioContext | null = null;

  const getAudioContext = () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  };
    
  
  

  

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


  const handleTimeUpdate = (e: SyntheticEvent<EventTarget>, index: number): void => {
    const currTime = (e.target as HTMLMediaElement).currentTime;
    const durr = (e.target as HTMLMediaElement).duration; 
    setCurrentTime(currTime);
    setDuration(durr);
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

  return (
    <div className='songs-section'>
      <div className='songs-header'>
          <div className='play-title'>
            <p>#</p>
          </div>
          <div>
            <p>Image</p>
          </div>
          <div>
            <p>Title</p>
          </div>
          <div>
            <p>Artiste</p>
          </div>
          <div>
            <p>Bpm</p>
          </div>
          <div>
            <p>Durée</p>
          </div>
          <div>
            <p>Type</p>
          </div>
      </div>
      <div className='songs-container'>
      {song_list.map((song: any, index: number) => (
        <div className='songs-table' 
        key={index} 
        style={{backgroundColor: isPlaying[index] ? '#27426e' : '', 
        color: isPlaying[index] ? 'white' : '#bcbcbc' }}>
          <div className='play-btn'>
            <button className='button-play' 
            onClick={() => togglePlay(index)} >
              {isPlaying[index] ? 
              <BsFillPauseFill className='icone' /> : <BsFillPlayFill className='icone' />}
            </button>
          </div>
          <div className='image'>
            <img src={song.image} alt='song image' />
          </div>
          <div>
            <h2 className='titre'>{song.name}</h2>
          </div>
          {
            /* 
              <div className='canva-box'>
                <canvas 
                ref={(canvasRef) => (canvasRefs[index] = canvasRef)} 
                width="300" 
                height="50"
                style={{color: 'black'}}
                ></canvas>
              </div>
            */
          }
          <div>
            <p>{song.artiste}</p>
          </div>
          <audio 
          controls ref={(ref) => (audioRefs[index] = ref)}
          preload="metadata"
          onTimeUpdate={(e) => handleTimeUpdate(e, index)}
          onLoadedMetadata={(e) => handleTimeUpdate(e, index)}
          >
            <source src={song.url} type="audio/mp3" />
          </audio>
          <div>
            <p>BPM: {song.bpm}</p>
          </div>
          <div>
            <p>{formatTime(listDuration[index])}</p>
          </div>
          <div>
            <p>{song.type}</p> 
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Songs;
