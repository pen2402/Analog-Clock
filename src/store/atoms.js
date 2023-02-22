import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist();

export const clockTimeState = atom({
  key: 'clockTimeState',
  default: {
    hour: 0,
    minute: 0,
    second: 0
  },
  effects_UNSTABLE: [persistAtom]
});