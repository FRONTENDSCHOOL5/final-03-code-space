import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { setToken } from '../../Atom/atom';
import axios from 'axios';

export default function MyProfileInfo() {
  const token = useRecoilValue(setToken);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const URL = 'https://api.mandarin.weniv.co.kr';
  const reqPath = `/user/myinfo`;

  async function getUserData() {
    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          // 프로필 정보 요청 (토큰 필요)
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const userData = response.data.user;
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  }
  return userData;
}
