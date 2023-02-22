import React, { useState, useEffect } from 'react';
import { MouseTooltipComponent } from './MouseTooltipComponent';
import '../style/WatchComponent.css';
import { useRecoilState } from 'recoil';
import { watchTimeState } from '../store/atoms';

export function WatchComponent() {
  const [watchTimeInfo, setWatchTimeInfo] = useState(new Date());
  const [watchTime, setWatchTime] = useRecoilState(watchTimeState);

  useEffect(() => {
    const timer = setInterval(() => {
      setWatchTimeInfo(new Date());
    }, 1000);
    return (() => clearInterval(timer));
  }, []);

  useEffect(() => {
    setWatchTime({
      hour: watchTimeInfo.getHours()%12,
      minute: watchTimeInfo.getMinutes(),
      second: watchTimeInfo.getSeconds()
    })
  }, [watchTimeInfo]);

  const watchHourHand = () => {
    document.documentElement.style.setProperty('--watch-hour-degree', `${ (watchTime.hour/12)*360 }deg`);
    return (
      <div className='watch-hour-hand'>
      </div>
    );
  }

  const watchMinuteHand = () => {
    document.documentElement.style.setProperty('--watch-minute-degree', `${ (watchTime.minute/60)*360 }deg`);
    return (
      <div className='watch-minute-hand'>
      </div>
    );
  }

  const watchSecondHand = () => {
    document.documentElement.style.setProperty('--watch-second-degree', `${ (watchTime.second/60)*360 }deg`);
    return (
      <div className='watch-second-hand'>
      </div>
    );
  }

  function handleMouseTooltipPosition(e) {
    document.documentElement.style.setProperty('--tooltip-pos-x', `${ e.clientX+10 }px`);
    document.documentElement.style.setProperty('--tooltip-pos-y', `${ e.clientY-24 }px`);
  }

  return (
    <div>
      <MouseTooltipComponent />
      { watchTime.hour }:
      { watchTime.minute }:
      { watchTime.second }
      <div className='watch' onMouseMove={(e) => handleMouseTooltipPosition(e)}>
        { watchHourHand() }
        { watchMinuteHand() }
        { watchSecondHand() }
      </div>
    </div>
  );
}
