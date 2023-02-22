import React, { useState, useEffect } from 'react';
import { MouseTooltipComponent } from './MouseTooltipComponent';
import { useRecoilState } from 'recoil';
import { clockTimeState } from '../store/atoms';
import '../style/ClockComponent.css';


export function ClockComponent() {
  const [clockDateInfo, setClockDateInfo] = useState(new Date());
  const [clockTime, setClockTime] = useRecoilState(clockTimeState);

  useEffect(() => {
    document.documentElement.style.setProperty('--tooltip-visibility', 'hidden');

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

  const clockIndex = () => {
    let indexArray = [];
    for (let i=0; i<12; i++) {
      const style = {
        transform: `translateY(-120px) rotate(${ i*30 }deg)`,
        width: i%3 ? '2px' : '4px'
      }
      indexArray.push(<div key={i} className={`clock-index`} style={ style } />)
    }
    return indexArray
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
        { clockIndex() }
        { clockHourHand() }
        { clockMinuteHand() }
        { clockSecondHand() }
      </div>
    </div>
  );
}
