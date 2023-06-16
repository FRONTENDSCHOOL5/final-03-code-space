import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil-persist
const { persistAtom } = recoilPersist();

export const setToken = atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const setAccountName = atom({
  key: 'accountName',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export let setIsFollowed = atom({
  key: 'isFollowed',
  default: false,
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
