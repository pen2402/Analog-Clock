import React, { useState, useEffect } from 'react';
import '../style/WatchComponent.css';


export function WatchComponent() {
  const [watchTime, setWatchTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setWatchTime(new Date());
    }, 1000);
    return (() => clearInterval(timer));
  }, []);

  const watchHour = () => {
    return watchTime.getHours()%12;
  }

  const watchMinute = () => {
    return watchTime.getMinutes();
  }

  const watchSecond = () => {
    return watchTime.getSeconds();
  }

  const watchHourHand = () => {
    document.documentElement.style.setProperty('--watch-hour-degree', `${ (watchHour()/12)*360 }deg`);
    return (
      <div class='watch-hour-hand'>
      </div>
    )
  }

  const watchMinuteHand = () => {
    document.documentElement.style.setProperty('--watch-minute-degree', `${ (watchMinute()/60)*360 }deg`);
    return (
      <div class='watch-minute-hand'>
      </div>
    )
  }

  const watchSecondHand = () => {
    document.documentElement.style.setProperty('--watch-second-degree', `${ (watchSecond()/60)*360 }deg`);
    return (
      <div class='watch-second-hand'>
      </div>
    )
  }

  return (
    <div>
      { watchHour() }:
      { watchMinute() }:
      { watchSecond() }
      <div class='watch'>
        { watchHourHand() }
        { watchMinuteHand() }
        { watchSecondHand() }
      </div>
    </div>
  );
}
