import React, { useState, useEffect } from 'react';
import BottomNav from 'Components/Common/BottomNav';
import MainHeader from 'Components/Common/MainHeader';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  setToken,
  searchFeedList,
  searchQuery,
  searchUserListAtom,
  searchTabAtom,
  setAccountName,
} from 'Atom/atomStore';
import styled from 'styled-components';
import { profileImg, APIDefaultImage } from 'Components/Feed/COMMON';
import iconHeart from 'assets/icons/heart.svg';
import iconComment from 'assets/icons/chat-green.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SMainLayout } from 'Styles/MainLayoutStyle';
import {
  SFeedCard,
  STitle,
  SUserName,
  SAccountname,
  SAuthor,
  SProfileImg,
  STitleContainer,
  SAuthorInfo,
  SHeartImg,
  SReactionContainer,
  SReactionContent,
  SReactionCount,
  SMainContent,
  SCreateDate,
} from 'Styles/FeedStyle/PostStyle';
import useSearchUser from 'Hooks/useSearchUser';
import Button from 'Components/Common/Button';
import { motion } from 'framer-motion';
import { AddFollow, DeleteFollow } from 'Components/Follow/FollowAddDelete';
const SearchPage = () => {
  const feedList = useRecoilValue(searchFeedList);
  const query = useRecoilValue(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [searchContent, setSearchContent] = useState(query);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTabToggle, setSearchTabToggle] = useRecoilState(searchTabAtom);
  const { searchUser } = useSearchUser();
  const [userList, setUserList] = useRecoilState(searchUserListAtom);
  const [myAccountName, setMyAccountName] = useRecoilState(setAccountName);
  const [token, setTokenState] = useRecoilState(setToken);

  const [resetToggle, setResetToggle] = useState(false);

  useEffect(() => {
    if (resetToggle) {
      setUserList([]);
      setResetToggle(false);
    }
  }, [resetToggle, setUserList]);

  useEffect(() => {
    if (searchTabToggle) {
      setResetToggle(false);
    }
    setSearchContent('');
  }, [searchTabToggle]);

  useEffect(() => {
    setSearchResults(feedList);
  }, [feedList]);

  const handleSearch = event => {
    const searchContent = event.target.value;
    setSearchContent(searchContent);
    if (searchContent !== '' || !searchTabToggle) {
      setResetToggle(true);
    }

    // searchUser 함수를 호출하고 검색어를 키워드로 전달합니다
    // searchUser(searchContent);

    const regex = new RegExp(searchContent, 'gi');
    const results = feedList.filter(
      post => regex.test(post.title) || regex.test(post.contents) || regex.test(post.code),
    );
    setSearchResults(results);

    setSearchParams({ query: searchContent });
  };

  function goFeedDetail(item, title, content, category, code) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, category, code, isSearch: true } } });
  }

  function goProfile(event, item) {
    event.stopPropagation();
    if (myAccountName === item.accountname) {
      navigate(`/myprofile`, { state: item });
    } else {
      navigate(`/myprofile/${item.accountname}`, { state: item });
    }
  }
  useEffect(() => {
    const query = searchParams.get('query');

    if (query) {
      setSearchContent(query);
      const regex = new RegExp(query, 'gi');
      const results = feedList.filter(
        post => regex.test(post.title) || regex.test(post.contents) || regex.test(post.code),
      );
      setSearchResults(results);
    }
  }, [feedList, searchParams]);

  function handleFollow(e, accountName) {
    const buttonContent = e.target.innerText;
    if (buttonContent === '팔로잉') {
      // 팔로워 제거
      DeleteFollow(accountName, token)
        .then(() => {
          // 함수 호출 성공 시 실행될 코드

          searchUser(searchContent);

          // setIsFollowing(false);
        })
        .catch(error => {
          // 함수 호출 실패 시 실행될 코드
        });
    } else if (buttonContent === '팔로우') {
      AddFollow(accountName, token)
        .then(() => {
          // 함수 호출 성공 시 실행될 코드

          searchUser(searchContent);

          // setIsFollowing(true);
        })
        .catch(error => {
          // 함수 호출 실패 시 실행될 코드
        });
    }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SFeedLayout>
        {searchTabToggle ? (
          <MainHeader type="search" handleSearch={handleSearch} searchValue={searchContent} />
        ) : (
          <MainHeader
            type="search-user"
            handleSearch={handleSearch}
            searchValue={searchContent}
            searchUser={() => searchUser(searchContent)}
          />
        )}
        <SSearchTab>
          <div onClick={() => setSearchTabToggle(true)} className={searchTabToggle ? 'active' : ''}>
            게시글
          </div>
          <div onClick={() => setSearchTabToggle(false)} className={searchTabToggle ? '' : 'active'}>
            유저
          </div>
        </SSearchTab>
        <ul>
          {searchContent.length > 0 ? (
            searchTabToggle ? (
              searchResults.map(item => (
                <SFeedCard key={item.id} onClick={() => goFeedDetail(item, item.title, item.contents)}>
                  <SAuthor>
                    {item.author.image === APIDefaultImage ? (
                      <SProfileImg src={profileImg} alt="프사" onClick={event => goProfile(event, item.author)} />
                    ) : (
                      <SProfileImg
                        src={item.author.image}
                        alt="프사"
                        onClick={event => goProfile(event, item.author)}
                      />
                    )}
                    <STitleContainer>
                      <STitle>
                        {item.title &&
                          item.title.split(new RegExp(`(${searchContent})`, 'gi')).map((part, index) => (
                            <span
                              key={index}
                              style={part.toLowerCase() === searchContent.toLowerCase() ? { color: '#2bae66' } : {}}>
                              {part}
                            </span>
                          ))}
                      </STitle>
                      <SAuthorInfo>
                        <SUserName>{item.author.username}</SUserName>
                        <SAccountname>@{item.author.accountname}</SAccountname>
                      </SAuthorInfo>
                    </STitleContainer>
                  </SAuthor>
                  <div>
                    <SMainContent>
                      {item.contents &&
                        item.contents.split(new RegExp(`(${searchContent})`, 'gi')).map((part, index) => (
                          <span
                            key={index}
                            style={part.toLowerCase() === searchContent.toLowerCase() ? { color: '#2bae66' } : {}}>
                            {part}
                          </span>
                        ))}
                    </SMainContent>
                  </div>
                  <SReactionContainer>
                    <SReactionContent>
                      <SReactionCount>
                        <SHeartImg src={iconHeart} alt="하트" />
                        {item.heartCount}
                      </SReactionCount>
                      <SReactionCount>
                        <SHeartImg src={iconComment} alt="댓글" />
                        {item.comments.length}
                      </SReactionCount>
                    </SReactionContent>
                    <SCreateDate>{item.createdAt.slice(0, 10)}</SCreateDate>
                  </SReactionContainer>
                </SFeedCard>
              ))
            ) : (
              userList.map(user => (
                <SFollowerList>
                  <SFollowCard key={user.id}>
                    <SFollowContainer onClick={() => navigate('/myprofile', { state: user })}>
                      <SImage src={user.image} alt={user.username} />
                      <STextContainer>
                        <SUserTabName>{user.username}</SUserTabName>
                        <SAccountName>@ {user.accountname}</SAccountName>
                      </STextContainer>
                    </SFollowContainer>

                    <Button
                      isFollowing={!user.isfollow}
                      followBtn={true}
                      padding="7px 0"
                      width="70px"
                      bgColor="var(--gray)"
                      fontSize="12px"
                      onClick={e => handleFollow(e, user.accountname, token)}>
                      {user.isfollow ? '팔로잉' : '팔로우'}
                    </Button>
                  </SFollowCard>
                </SFollowerList>
              ))
            )
          ) : (
            <></>
          )}
        </ul>
        <BottomNav />
      </SFeedLayout>
    </motion.div>
  );
};

export default SearchPage;
const SFollowerList = styled.div`
  padding: 20px 16px;
  color: var(--white);
  font-family: var(--default-font);
`;

const SFeedLayout = styled(SMainLayout)`
  padding-bottom: 70px;
`;
const SSearchTab = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;

  div {
    color: #767676;
    width: 100%;
    text-align: center;
    border-bottom: 2px solid #e0e0e0;
    padding: 10px 0px;
    cursor: pointer;
  }
  div:hover {
    border-bottom: 2px solid var(--point-color);
    color: var(--point-color);
  }
  div.active {
    border-bottom: 2px solid var(--point-color);
    color: var(--point-color);
  }
`;

const SFollowCard = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SFollowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
`;

const STextContainer = styled.div`
  margin-left: 12px;
`;

const SUserTabName = styled.p`
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--white);
`;

const SAccountName = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: var(--darkgray);
`;
