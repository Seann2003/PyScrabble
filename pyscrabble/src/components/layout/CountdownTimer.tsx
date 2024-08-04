import React, { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  isStarted: boolean;
  onTimeEnd: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ isStarted, onTimeEnd }) => {
  const [time, setTime] = useState<number>(100); // 10 minutes in seconds
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if(isStarted){
      timerId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            onTimeEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isStarted, onTimeEnd]);

  useEffect(() => {
    if (time === 0 && audioRef.current) {
      audioRef.current.play();
    }
  }, [time]);

    const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = secs < 10 ? `0${secs}` : secs.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      {formatTime(time)}
      <audio ref={audioRef} src={require('../../assets/countdown.mp3')}/>
    </>
  );
};

export default CountdownTimer;
