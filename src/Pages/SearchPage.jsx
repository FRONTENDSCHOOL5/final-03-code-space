import React, { useState, useEffect } from 'react';
import BottomNav from '../Components/Common/BottomNav';
import MainHeader from '../Components/Common/MainHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchFeedList, searchQuery } from '../Atom/atom';
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
const SearchPage = () => {
  const feedList = useRecoilValue(searchFeedList);
  const query = useRecoilValue(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [searchContent, setSearchContent] = useState(query);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchResults(feedList);
  }, [feedList]);

  const handleSearch = event => {
    const searchContent = event.target.value.trim();
    setSearchContent(searchContent); // 검색어 업데이트
    const regex = new RegExp(searchContent, 'gi');
    const results = feedList.filter(post => regex.test(post.title) || regex.test(post.contents));
    setSearchResults(results);

    // 검색어를 쿼리 파라미터로 추가하여 디테일 페이지에서 검색 페이지로 돌아왔을 때 검색어를 유지할 수 있도록 함
    setSearchParams({ query: searchContent });
  };

  function goFeedDetail(item, title, content) {
    navigate('/feeddetail', { state: { feedList: { item, title, content, isSearch: true } } });
  }

  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  // 검색어가 쿼리 파라미터로 전달되었을 경우, 검색어를 초기값으로 설정
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
      <ul>
        {searchContent.length > 0 ? (
          searchResults.map(item => (
            <>
              <SFeedCard key={item.id + ' '}>
                <SAuthor>
                  {item.author.image === APIDefaultImage ? (
                    <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(item.author)} />
                  ) : (
                    <SProfileImg src={item.author.image} alt="프사" onClick={() => goProfile(item.author)} />
                  )}
                  <STitleContainer onClick={() => goFeedDetail(item, item.title, item.contents)}>
                    <STitle onClick={() => goFeedDetail(item, item.title, item.contents)}>
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
            </>
          ))
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
