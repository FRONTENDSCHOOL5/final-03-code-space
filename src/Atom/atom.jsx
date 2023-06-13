import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil-persist
const { persistAtom } = recoilPersist();

export const setToken = atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
