import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil-persist
const { persistAtom } = recoilPersist({
  key: 'code-space-config',
});

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

export const setIsLogined = atom({
  key: 'isLogined',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const setIsFollowed = atom({
  key: 'isFollowed',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export const scrollPositionAtom = atom({
  key: 'scrollPositionAtom',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const loginUserImageAtom = atom({
  key: 'loginUserImageAtom',
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
export const categoryTagIndex = atom({
  key: 'categoryTagState',
  default: 0,
});
export const configModalAtom = atom({
  key: 'configModalAtom',
  default: '',
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
export const noneEnterAtom = atom({
  key: 'noneEnterAtom',
  default: false,
});

export const isLoginModalSuccessAtom = atom({
  key: 'isLoginSuccess',
  default: false,
});

export const ShowGreenlightAtom = atom({
  key: 'ShowGreenlight',
  default: true,
});

export const isInitialLoadAtom = atom({
  key: 'isInitialLoadAtom',
  default: true,
});
export const searchUserListAtom = atom({
  key: 'searchUserList',
  default: [],
});
export const configPostIdAtom = atom({
  key: 'configPostIdAtom',
  default: '',
});
export const searchTabAtom = atom({
  key: 'searchTabAtom',
  default: true,
});
export const isLoginAlertAtom = atom({
  key: 'isLoginAlertAtom',
  default: false,
});
export const isLogOutAlertAtom = atom({
  key: 'isLogOutAlertAtom',
  default: false,
});
