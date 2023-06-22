import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil-persist
const { persistAtom } = recoilPersist();

export const setToken = atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
export const searchFeedList = atom({
  key: 'FeedList',
  default: [],
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
export const categoryTagIndex = atom({
  key: 'categoryTagState',
  default: 0,
});
export const isConfigModal = atom({
  key: 'isConfigModal',
  default: false,
});
export const isEditCheck = atom({
  key: 'isEditCheck',
  default: false,
});
export const searchQuery = atom({
  key: 'searchQuery',
  default: '',
});
export const isModalAtom = atom({
  key: 'isModalAtom',
  default: false,
});
