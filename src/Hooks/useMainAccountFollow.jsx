import { MainAccountToken, BASEURL } from 'Components/Feed/COMMON';
import axios from 'axios';

const useMainAccountFollow = () => {
  async function followingAcount(accountName) {
    //   팔로워 추가해주기 -> api 요청
    const reqPath = `profile/${accountName}/follow`;

    try {
      const response = await axios(BASEURL + reqPath, {
        method: 'post',
        headers: {
          // 프로필 정보 요청 (토큰 필요)
          Authorization: MainAccountToken,
          'Content-type': 'application/json',
        },
      });
    } catch (error) {}
  }
  return { followingAcount };
};

export default useMainAccountFollow;
