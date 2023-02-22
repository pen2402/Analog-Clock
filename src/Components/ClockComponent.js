import React, { useState, useEffect } from 'react';
import { MouseTooltipComponent } from './MouseTooltipComponent';
import '../style/ClockComponent.css';
import { useRecoilState } from 'recoil';
import { clockTimeState } from '../store/atoms';

export function ClockComponent() {
  const [clockDateInfo, setClockDateInfo] = useState(new Date());
  const [clockTime, setClockTime] = useRecoilState(clockTimeState);

  useEffect(() => {
    const timer = setInterval(() => {
      setClockDateInfo(new Date());
    }, 1000);
    return (() => clearInterval(timer));
  }, []);

  useEffect(() => {
    setClockTime({
      hour: clockDateInfo.getHours(),
      minute: clockDateInfo.getMinutes(),
      second: clockDateInfo.getSeconds()
    })
  }, [clockDateInfo]);

  const clockHourHand = () => {
    document.documentElement.style.setProperty('--clock-hour-degree', `${ ((clockTime.hour%12)/12)*360 }deg`);
    return (
      <div className='clock-hour-hand'>
      </div>
    );
  }

  const clockMinuteHand = () => {
    document.documentElement.style.setProperty('--clock-minute-degree', `${ (clockTime.minute/60)*360 }deg`);
    return (
      <div className='clock-minute-hand'>
      </div>
    );
  }

  const clockSecondHand = () => {
    document.documentElement.style.setProperty('--clock-second-degree', `${ (clockTime.second/60)*360 }deg`);
    return (
      <div className='clock-second-hand'>
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
    <div className='clock'>
      <MouseTooltipComponent />
      <div className='clock-body'
        onMouseMove={(e) => handleMouseTooltipPosition(e)}
        onMouseLeave={() => handleCloseMouseTooltip()}>
        { clockHourHand() }
        { clockMinuteHand() }
        { clockSecondHand() }
      </div>
    </div>
  );
}
