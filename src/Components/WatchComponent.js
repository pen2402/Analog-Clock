import React, { useState, useEffect } from 'react';
import { MouseTooltipComponent } from './MouseTooltipComponent';
import '../style/WatchComponent.css';
import { useRecoilState } from 'recoil';
import { watchTimeState } from '../store/atoms';

export function WatchComponent() {
  const [watchDateInfo, setWatchDateInfo] = useState(new Date());
  const [watchTime, setWatchTime] = useRecoilState(watchTimeState);

  useEffect(() => {
    const timer = setInterval(() => {
      setWatchDateInfo(new Date());
    }, 1000);
    return (() => clearInterval(timer));
  }, []);

  useEffect(() => {
    setWatchTime({
      hour: watchDateInfo.getHours(),
      minute: watchDateInfo.getMinutes(),
      second: watchDateInfo.getSeconds()
    })
  }, [watchDateInfo]);

  const watchHourHand = () => {
    document.documentElement.style.setProperty('--watch-hour-degree', `${ ((watchTime.hour%12)/12)*360 }deg`);
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
    document.documentElement.style.setProperty('--tooltip-visibility', 'visible');
    document.documentElement.style.setProperty('--tooltip-pos-x', `${ e.clientX+10 }px`);
    document.documentElement.style.setProperty('--tooltip-pos-y', `${ e.clientY-24 }px`);
  }

  function handleCloseMouseTooltip(e) {
    document.documentElement.style.setProperty('--tooltip-visibility', 'hidden');
  }

  return (
    <div className='watch'>
      <MouseTooltipComponent />
      <div className='watch-body'
        onMouseMove={(e) => handleMouseTooltipPosition(e)}
        onMouseLeave={() => handleCloseMouseTooltip()}>
        { watchHourHand() }
        { watchMinuteHand() }
        { watchSecondHand() }
      </div>
    </div>
  );
}
