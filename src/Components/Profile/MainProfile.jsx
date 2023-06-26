import { useRecoilValue } from 'recoil';
import { setAccountName } from 'Atom/atomStore';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainProfileBtns from './MainProfileBtns';
import axios from 'axios';
import { setToken } from 'Atom/atomStore';
import { removeFollowerById } from './removeMainAccount';

import WithSkeleton from 'Components/Common/Skeleton';

export default function MainProfile({ accountName }) {
  const token = useRecoilValue(setToken);
  const myAccountName = useRecoilValue(setAccountName);
  const [isFetchData, setIsFetchData] = useState(false);
  const [profile, setProfile] = useState({});
  const [followerCount, setFollowerCount] = useState(profile.followerCount);
  const [followerCountRender, setFollowerCountRender] = useState(profile.followerCount);
  const [isSubscribed, setIsSubscribed] = useState(profile.isfollow);
  const [isClickFollow, setIsClickFollow] = useState(false);

  //
  //
  //

  useEffect(() => {
    setIsFetchData(false);
    getUserData();
  }, [followerCount, accountName, isSubscribed]);

  async function getUserData() {
    const URL = 'https://api.mandarin.weniv.co.kr';
    const reqPath = `/profile/${accountName}`;

    try {
      const response = await axios.get(URL + reqPath, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });

      // 메인계정 지워주기
      const followrUpdate = removeFollowerById(response.data.profile, '6494255eb2cb20566369fa5c');
      setProfile(followrUpdate);
      setIsSubscribed(followrUpdate.isfollow);
      setFollowerCount(followrUpdate.follower.length);
      setFollowerCountRender(followrUpdate.follower.length);
      setIsFetchData(true);
    } catch (error) {}
  }

  return (
    <>
      {isFetchData ? (
        <SProfileLayout>
          <SProfileImgBox>
            <SFollowLink to="/follow" state={{ accountName: profile.accountname }}>
              <strong>{followerCount}</strong>
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
            <p>@ {profile.accountname}</p>
            <p>{profile.intro}</p>
          </SProfileInfo>

          <MainProfileBtns
            accountName={profile.accountname}
            setIsSubscribed={setIsSubscribed}
            isSubscribed={isSubscribed}
            isMyProfile={profile.accountname === myAccountName}
            setFollowerCount={setFollowerCount}
            setIsClickFollow={setIsClickFollow}
          />
        </SProfileLayout>
      ) : isClickFollow ? (
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
            <p>@ {profile.accountname}</p>
            <p>{profile.intro}</p>
          </SProfileInfo>

          <MainProfileBtns
            accountName={profile.accountname}
            setIsSubscribed={setIsSubscribed}
            isSubscribed={isSubscribed}
            isMyProfile={profile.accountname === myAccountName}
            setFollowerCount={setFollowerCount}
            setIsClickFollow={setIsClickFollow}
          />
        </SProfileLayout>
      ) : (
        <WithSkeleton isLoading={isFetchData} type="mainProfile" />
      )}
    </>
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
