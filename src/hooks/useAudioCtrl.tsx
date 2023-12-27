// Hooks
import { useState, useEffect } from 'react';

interface AudioController {
  audioTag: (HTMLAudioElement | null)[];
  showSongDuration: () => void;
  songList: any[];
}

const useAudioController = (
    songList: any[], 
    listAudio: (HTMLAudioElement | null)[], 
    songDurée: number[]
    ): AudioController => 
{   
    // State -> audio & audio mode & audio events 
    const audioTag: (HTMLAudioElement | null)[] = listAudio;
    const [listDuration, setListDuration] = useState<number[]>(new Array(songList.length).fill(songDurée));

    // Page load 
    useEffect(() => {
        showSongDuration()
    }, []);

    const showSongDuration = () => {
        const updatedDuration = [...listDuration];
        // Parcourez les autres indices et mettez à jour leur durée s'ils sont différents de l'index actuel
        for (let i = 0; i < audioTag.length; i++) {
            const otherAudioEl = audioTag[i];
            if (otherAudioEl && otherAudioEl.duration !== 0) {
                // Mise à jour immédiate de la durée
                updatedDuration[i] = otherAudioEl.duration;
            }
        }
    
        // Mettez à jour l'état une seule fois en dehors de la boucle
        setListDuration(updatedDuration);
    };

      

  
  
    return {
    audioTag,
    songList,
    showSongDuration,
    };
  };
  
  export default useAudioController;