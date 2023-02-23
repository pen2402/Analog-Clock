import React from 'react';
import { useRecoilValue } from 'recoil';
import { clockTimeState } from '../store/atoms';
import '../style/MouseTooltipComponent.css';


export function MouseTooltipComponent() {
  const clockTime = useRecoilValue(clockTimeState);
  
  return (
    <div className='tooltip'>
      { String(clockTime.hour).padStart(2, '0') }:
      { String(clockTime.minute).padStart(2, '0') }:
      { String(clockTime.second).padStart(2, '0') }
    </div>
  );
}
