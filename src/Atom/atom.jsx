import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil-persist
const { persistAtom } = recoilPersist();

export const setToken = atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const headerToggle = atom({
  key: 'headerToggle',
  default: 'feed',
});
export const bottomNavIndex = atom({
  key: 'bottomNavIndex',
  default: 0,
});
export const isLandingEnter = atom({
  key: 'isLandingEnter',
  default: true,
});
export const isfeedFetchToggle = atom({
  key: 'isfeedFetchToggle',
  default: false,
});
export const categoryTag = atom({
  key: 'categoryTag',
  default: '전체',
});
