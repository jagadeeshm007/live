import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface ProgressBarProps {
    progress?: string;
  }

// Styled components for the music player
const MusicPlayerContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  padding: 15px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 4px 4px 0 #000;
  font-family: 'Roboto Mono', monospace;
  z-index: 100;
`;

const PlayerTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px dashed #000;
  padding-bottom: 8px;
`;

const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  gap: 10px;
`;

const PlayerButton = styled.button`
  background-color: #fff;
  border: 2px solid #000;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 2px 2px 0 #000;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SongInfo = styled.div`
  text-align: center;
  margin: 10px 0;
  font-size: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// const VolumeControl = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 10px;
//   gap: 5px;
// `;

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border: 1px solid #000;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
`;

const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  background-color: #000;
  width: ${props => props.progress || '0%'};
`;

const TogglePlayerButton = styled.button`
  position: absolute;
  right: 220px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  border: 2px solid #000;
  width: 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 2px 2px 0 #000;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

// Music Player Component
const MusicPlayer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [songs] = useState([
    { title: "No.1 Party Anthem", file: "src/data/songs/song1.mp3" }
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      // Set up event listeners
      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      
      const handleEnded = () => {
        nextSong();
      };
      
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);
      
      // Set volume
      audio.volume = volume;
      
      // Cleanup
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex]);
  
  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle next song
  const nextSong = () => {
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
    
    // Need to wait for state update to reflect before playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };
  
  // Handle previous song
  const prevSong = () => {
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };
  
  // Handle volume change
//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//   };
  
  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const container = e.currentTarget;
      const boundingRect = container.getBoundingClientRect();
      const clickPosition = (e.clientX - boundingRect.left) / boundingRect.width;
      const newTime = clickPosition * audioRef.current.duration ;
      
      audioRef.current.currentTime = newTime;
      setProgress(clickPosition * 100);
    }
  };
  
  return (
    <>
      <TogglePlayerButton onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '>' : '<'}
      </TogglePlayerButton>
      
      {isVisible && (
        <MusicPlayerContainer>
          <PlayerTitle>Music</PlayerTitle>
          
          <audio 
            ref={audioRef}
            src={songs[currentSongIndex].file}
          />
          
          <SongInfo>
            {songs[currentSongIndex].title}
          </SongInfo>
          
          <PlayerControls>
            <PlayerButton onClick={prevSong}>⏮</PlayerButton>
            <PlayerButton onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶️'}
            </PlayerButton>
            <PlayerButton onClick={nextSong}>⏭</PlayerButton>
          </PlayerControls>
          
          <ProgressContainer onClick={handleSeek}>
            <ProgressBar progress={`${progress}%` } />
          </ProgressContainer>
          
          {/* <VolumeControl>
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '100%' }}
            />
          </VolumeControl> */}
        </MusicPlayerContainer>
      )}
    </>
  );
};

export default MusicPlayer;