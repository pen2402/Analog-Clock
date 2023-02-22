import React from 'react';
import '../style/MouseTooltipComponent.css';
import { useRecoilValue } from 'recoil';
import { watchTimeState } from '../store/atoms';


export function MouseTooltipComponent() {
  const watchTime = useRecoilValue(watchTimeState);
  
  return (
    <div className='tooltip'>
      { watchTime.hour }:
      { watchTime.minute }:
      { watchTime.second }
    </div>
  );
}
