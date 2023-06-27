import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { setToken } from 'Atom/atomStore';
import axios from 'axios';

export default function MyProfileInfo() {
  const token = useRecoilValue(setToken);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    //
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

      // const userData = response.data.user;
      setUserData(response.data.user);
    } catch (error) {}
  }
  return userData;
}
