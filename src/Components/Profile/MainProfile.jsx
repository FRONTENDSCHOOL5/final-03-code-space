import { useRecoilValue } from 'recoil';
import { setAccountName } from '../../Atom/atom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainProfileBtns from './MainProfileBtns';
import axios from 'axios';
import { setToken } from '../../Atom/atom';

export default function MainProfile({ profile }) {
  const token = useRecoilValue(setToken);
  const accountName = useRecoilValue(setAccountName);

  const [followerCount, setFollowerCount] = useState(profile.followerCount);
  const [followerCountRender, setFollowerCountRender] = useState(profile.followerCount);

  const [isSubscribed, setIsSubscribed] = useState(profile.isfollow);

  // console.log(profile);
  // console.log(profile.accountname);
  // console.log(profile.followerCount);
  // console.log(followerCount);
  // console.log(followerCountRender);

  useEffect(() => {
    getUserData();
  });
  // followerCount는 내 프로필에는 변화가 없기 때문에 내 프로필을 불러올 때 getUserData()가 실행되지 않음.(전에 값이 들어가거나 undefind)
  // 내 프로필을 들어갈 때도 getUserData()가 실행되기를 원하기 때문에 이 부분 의존성 배열을 제거(의존성 배열을 뺄 경우 페이지가 로딩될 때마다 실행)

  async function getUserData() {
    const URL = 'https://api.mandarin.weniv.co.kr';
    const reqPath = `/profile/${profile.accountname}`;

    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      console.log(response.data.profile);
      setIsSubscribed(response.data.profile.isfollow);
      setFollowerCount(response.data.profile.followerCount);
      setFollowerCountRender(response.data.profile.followerCount);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SProfileLayout>
      <SProfileImgBox>
        <SFollowLink to="/follow" state={{ accountName: profile.accountname }}>
          <strong>{followerCountRender}</strong>
          <p>followers</p>
        </SFollowLink>
        <img src={profile.image} alt="" />
        <SFollowLink to="/following" state={{ accountName: profile.accountname }}>
          <strong>{profile.followingCount}</strong>
          <p>followings</p>
        </SFollowLink>
      </SProfileImgBox>

      <SProfileInfo>
        <strong>{profile.username}</strong>
        <p>{profile.accountname}</p>
        <p>{profile.intro}</p>
      </SProfileInfo>

      <MainProfileBtns
        accountName={profile.accountname}
        setIsSubscribed={setIsSubscribed}
        isSubscribed={isSubscribed}
        // isfollow={profile.isfollow}
        isMyProfile={profile.accountname === accountName}
        setFollowerCount={setFollowerCount}
        // followerCount={followerCount}
      />
    </SProfileLayout>
  );
}

const SProfileLayout = styled.section`
  background-color: var(--black);
  padding: 30px 16px 26px;
  font-family: var(--default-font);
  border-bottom: 1px solid #4d4d4d;
`;

const SProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 41px;
  align-items: center;

  img {
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const SFollowLink = styled(Link)`
  text-align: center;

  strong {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: var(--white);
  }

  p {
    margin-top: 6px;
    font-weight: 400;
    font-size: 10px;
    color: var(--gray);
  }
`;

const SProfileInfo = styled.div`
  text-align: center;
  margin: 16px 0 24px;

  strong {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 6px;
    color: var(--white);
  }

  p {
    margin: 5px 0 16px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--darkgray);
  }

  p:last-child {
    font-size: 14px;
    line-height: 19px;
    color: var(--gray);
  }
`;
