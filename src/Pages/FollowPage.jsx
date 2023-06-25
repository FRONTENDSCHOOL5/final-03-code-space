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
  const reqPath = `/profile/${accountName}/follower`;

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
      console.log(response.data);

      setFollowList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MainHeader type="profile" />
      <SFollowerList>
        {followList.map(follow => {
          console.log(follow);
          return <FollowListCard key={follow._id} profile={follow} />;
        })}
      </SFollowerList>
      <BottomNav />
    </>
  );
}

const SFollowerList = styled.div`
  padding: 20px 16px;
  color: var(--white);
  font-family: var(--default-font);
`;
