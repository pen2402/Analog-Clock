import React from 'react';
import '../style/MouseTooltipComponent.css';
import { useRecoilValue } from 'recoil';
import { watchTimeState } from '../store/atoms';


export function MouseTooltipComponent() {
  const watchTime = useRecoilValue(watchTimeState);
  
  return (
    <div className='tooltip'>
      { String(watchTime.hour).padStart(2, '0') }:
      { String(watchTime.minute).padStart(2, '0') }:
      { String(watchTime.second).padStart(2, '0') }
    </div>
  );
}
