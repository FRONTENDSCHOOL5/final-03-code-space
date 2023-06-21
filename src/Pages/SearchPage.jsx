import React, { useState, useEffect } from 'react';
import BottomNav from '../Components/Common/BottomNav';
import MainHeader from '../Components/Common/MainHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchFeedList, searchQuery, searchUserListAtom } from '../Atom/atom';
import styled from 'styled-components';
import { profileImg, APIDefaultImage } from '../Components/Feed/COMMON';
import iconHeart from '../assets/icons/heart.svg';
import iconComment from '../assets/icons/chat-green.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SMainLayout } from '../Styles/MainLayoutStyle';
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
} from '../Styles/FeedStyle/PostStyle';
import useSearchUser from '../Hooks/useSearchUser';
import Button from '../Components/Common/Button';
const SearchPage = () => {
  const feedList = useRecoilValue(searchFeedList);
  const query = useRecoilValue(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [searchContent, setSearchContent] = useState(query);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTabToggle, setSearchTabToggle] = useState(true);
  const { searchUser } = useSearchUser();
  const userList = useRecoilValue(searchUserListAtom);
  useEffect(() => {
    setSearchResults(feedList);
  }, [feedList]);

  const handleSearch = event => {
    const searchContent = event.target.value.trim();
    setSearchContent(searchContent);

    // searchUser 함수를 호출하고 검색어를 키워드로 전달합니다
    searchUser(searchContent);

    const regex = new RegExp(searchContent, 'gi');
    const results = feedList.filter(post => regex.test(post.title) || regex.test(post.contents));
    setSearchResults(results);

    setSearchParams({ query: searchContent });
  };

  function goFeedDetail(item, title, content) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, isSearch: true } } });
  }

  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  useEffect(() => {
    const query = searchParams.get('query');

    if (query) {
      setSearchContent(query);
      const regex = new RegExp(query, 'gi');
      const results = feedList.filter(post => regex.test(post.title) || regex.test(post.contents));
      setSearchResults(results);
    }
  }, [feedList, searchParams]);
  return (
    <SFeedLayout>
      <MainHeader type="search" handleSearch={handleSearch} searchValue={searchContent} />
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
              <SFeedCard key={item.id}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(item.author)} />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" onClick={() => goProfile(item.author)} />
                  )}
                  <STitleContainer onClick={() => goFeedDetail(item, item.title, item.contents)}>
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
                  <SMainContent onClick={() => goFeedDetail(item, item.title, item.contents)}>
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
                  <SReactionContent onClick={() => goFeedDetail(item, item.title, item.contents)}>
                    <SReactionCount>
                      <SHeartImg src={iconHeart} alt="하트" />
                      {item.heartCount}
                    </SReactionCount>
                    <SReactionCount>
                      <SHeartImg src={iconComment} alt="댓글" />
                      {item.comments.length}
                    </SReactionCount>
                  </SReactionContent>
                  <SAccountname>{item.createdAt.slice(0, 10)}</SAccountname>
                </SReactionContainer>
              </SFeedCard>
            ))
          ) : (
            userList.map(user => (
              <SFeedCard key={user.id}>
                <SFollowContainer onClick={() => navigate('/myprofile', { state: user })}>
                  <SImage src={user.image} alt={user.username} />
                  <STextContainer>
                    <SUserName>{user.username}</SUserName>
                    <SAccountName>@ {user.accountname}</SAccountName>
                  </STextContainer>
                </SFollowContainer>

                <SBtnContainer>
                  <Button
                    width="80px"
                    bgColor="var(--gray)"
                    fontSize="12px"
                    // onClick={e => handleFollow(e, user.accountname, token)}
                  >
                    {/* {isFollower ? '삭제' : isFollowing ? '팔로잉' : '팔로우'} */}
                  </Button>
                </SBtnContainer>
              </SFeedCard>
            ))
          )
        ) : (
          <></>
        )}
      </ul>
      <BottomNav />
    </SFeedLayout>
  );
};

export default SearchPage;

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

const SAccountName = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: var(--darkgray);
`;

const SBtnContainer = styled.div``;
