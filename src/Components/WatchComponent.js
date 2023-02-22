import React, { useState, useEffect } from 'react';


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

  return (
    <div>
      { watchHour() }:
      { watchMinute() }:
      { watchSecond() }
    </div>
  );
}
