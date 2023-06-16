import React from 'react';
import { useRecoilValue } from 'recoil';
import { setAccountName } from '../../Atom/atom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainProfileBtns from './MainProfileBtns';

export default function MainProfile({ profile }) {
  const accountName = useRecoilValue(setAccountName);
  console.log(profile);

  return (
    <SProfileLayout>
      <SProfileImgBox>
        <SFollowLink to="/follow">
          <strong>{profile.followerCount}</strong>
          <p>followers</p>
        </SFollowLink>
        <img src={profile.image} alt="" />
        <SFollowLink to="/following">
          <strong>{profile.followingCount}</strong>
          <p>followings</p>
        </SFollowLink>
      </SProfileImgBox>

      <SProfileInfo>
        <strong>{profile.username}</strong>
        <p>{profile.accountname}</p>
        <p>{profile.intro}</p>
      </SProfileInfo>

      <MainProfileBtns isMyProfile={profile.accountname === accountName} />
    </SProfileLayout>
  );
}

const SProfileLayout = styled.section`
  box-shadow: inset 0 0 20px red;
  background-color: var(--black);
  padding: 30px 16px 26px;
  font-family: var(--default-font);
`;

const SProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 41px;
  align-items: center;
  box-shadow: inset 0 0 20px red;

  img {
    width: 110px;
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
