import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import profileImg from '../../assets/img/profile-img.png';
import iconChat from '../../assets/icons/chat.png';
import iconShare from '../../assets/icons/share.png';
import Button from '../Common/Button';

export default function MainProfile() {
  const [userData, setUserData] = useState({
    followerCount: 0,
    followingCount: 0,
    username: '',
    accountname: '',
    intro: '',
  });

  useEffect(() => {
    getUserData();
  }, []);

  const URL = 'https://api.mandarin.weniv.co.kr';

  async function getUserData() {
    try {
      const response = await axios.get(`${URL}/user/myinfo`, {
        url: `${URL}/user/myinfo`,
        method: 'get',
        headers: {
          // Authorization: `Bearer ${token}`
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzc0YjJjYjIwNTY2MzJkMDAwNSIsImV4cCI6MTY5MDY5NDI2NywiaWF0IjoxNjg1NTEwMjY3fQ.5zJTqiHvH3B0rRBfkV9_BQH6atdJX6qg5V3P99I7T8M',
        },
      });
      console.log(response.data);

      const userData = response.data.user;

      setUserData({
        followerCount: userData.followerCount,
        followingCount: userData.followingCount,
        username: userData.username,
        accountname: userData.accountname,
        intro: userData.intro,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SProfileLayout>
      <SProfileImgBox>
        <SFollowLink to="/follow">
          <strong>{userData.followerCount}</strong>
          <p>followers</p>
        </SFollowLink>
        <img src={profileImg} alt="" />
        <SFollowLink to="/following">
          <strong>{userData.followingCount}</strong>
          <p>followings</p>
        </SFollowLink>
      </SProfileImgBox>

      <SProfileInfo>
        <strong>{userData.username}</strong>
        <p>{userData.accountname}</p>
        <p>{userData.intro}</p>
      </SProfileInfo>

      <SBtnBox>
        <Button width="120px" myProfileBtn={true}>
          프로필 수정
        </Button>
        <Button width="100px" myProfileBtn={true}>
          상품 등록
        </Button>
      </SBtnBox>
    </SProfileLayout>
  );
}

const SProfileLayout = styled.section`
  box-shadow: inset 0 0 20px red;
  background-color: var(--black);
  padding: 30px 0 26px;
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

const SBtnBox = styled.div`
  box-shadow: inset 0 0 20px red;
  text-align: center;

  button:first-child {
    margin-right: 12px;
  }
`;
