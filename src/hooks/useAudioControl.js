import { useState, useEffect } from 'react';

const useAudioControl = (
    audioRefs, 
    audioEvent, 
    updatedIsPlaying,
    isPlaying, 
    prevAudioEl, 
    nextAudioEl, 
    activeAudioEl, 
    currentSong
    ) => {
  const [audioEvent, setAudioEvent] = useState(audioEvent);

  useEffect(() => {
    const eventListeners = [];

    const handleAudioEnded = (index) => () => {
      updatedIsPlaying = [...isPlaying]; // A voir
      updatedIsPlaying[index] = false;
      setIsPlaying(updatedIsPlaying);
      // Vous pouvez effectuer d'autres actions ici lorsque la chanson se termine
    };

    audioRefs.forEach((audioRef, index) => {
      if (audioRef) {
        const eventListener = handleAudioEnded(index);
        setAudioEvent('ended');
        audioRef.addEventListener(audioEvent,eventListener);// A voir state variable for 'ended'
        eventListeners.push({ audioRef, eventListener });
      }
    });

    return () => {
      // Nettoyez les écouteurs d'événements lorsque le composant est démonté
      eventListeners.forEach(({ audioRef, eventListener }) => {
        audioRef.removeEventListener('ended', eventListener);
      });
    };
  }, [audioRefs, isPlaying]);

  // Ajoutez d'autres fonctions ou états personnalisés ici selon vos besoins

  return {
    isPlaying,
    // Ajoutez d'autres valeurs ou fonctions personnalisées que vous souhaitez exposer
  };
};

export default useAudioControl;
