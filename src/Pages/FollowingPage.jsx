import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { setToken } from '../Atom/atom';
import axios from 'axios';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';
import FollowListCard from '../Components/Follow/FollowListCard';
import styled from 'styled-components';

export default function FollowPage() {
  const token = useRecoilValue(setToken);

  const location = useLocation();
  let accountName = location.state.accountName;

  const [followList, setFollowList] = useState([]);
  console.log(accountName);

  // followList가 변할 때마다 실행
  useEffect(() => {
    // console.log('test');
    getFollowData();
  }, [followList]);

  const URL = 'https://api.mandarin.weniv.co.kr';
  const reqPath = `/profile/${accountName}/following`;

  async function getFollowData() {
    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          // 프로필 정보 요청 (토큰 필요)
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });

      setFollowList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MainHeader type="profile" />
      <SFollowingList>
        {followList.map(follow => {
          console.log(follow);
          return <FollowListCard key={follow._id} profile={follow} />;
        })}
      </SFollowingList>
      <BottomNav />
    </>
  );
}

const SFollowingList = styled.div`
  box-shadow: inset 0 0 30px red;
  padding: 20px 16px;
  color: var(--white);
  font-family: var(--default-font);
`;
