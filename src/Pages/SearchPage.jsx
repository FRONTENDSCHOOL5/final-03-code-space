import React, { useState } from 'react';
import BottomNav from '../Components/Common/BottomNav';
import MainHeader from '../Components/Common/MainHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchFeedList } from '../Atom/atom';
import styled from 'styled-components';
import { profileImg, APIDefaultImage } from '../Components/Feed/COMMON';
import iconHeart from '../assets/icons/heart.svg';
import iconComment from '../assets/icons/chat-green.svg';
import { useNavigate } from 'react-router-dom';
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
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = event => {
    const searchContent = event.target.value;
    const results = feedList.filter(post => post.contents?.includes(searchContent));
    setSearchResults(results);
  };
  function goFeedDetail(item, title, content) {
    navigate('/feeddetail', { state: { item, title, content } });
  }
  function goProfile(item) {
    navigate('/myprofile', { state: item });
  }

  console.log(feedList);
  return (
    <SSearchLayout>
      <MainHeader type="search" handleSearch={handleSearch} />
      <ul>
        {searchResults.map(item => (
          <>
            <SFeedCard key={item.id + 1}>
              <SAuthor>
                {item.author.image === APIDefaultImage ? (
                  <SProfileImg src={profileImg} alt="프사" onClick={() => goProfile(item.author)} />
                ) : (
                  <SProfileImg src={item.author.image} alt="프사" onClick={() => goProfile(item.author)} />
                )}
                <STitleContainer onClick={() => goFeedDetail(item, item.title, item.contents)}>
                  <STitle onClick={() => goFeedDetail(item, item.title, item.contents)}>{item.title}</STitle>
                  <SAuthorInfo>
                    <SUserName>{item.author.username}</SUserName>
                    <SAccountname>@{item.author.accountname}</SAccountname>
                  </SAuthorInfo>
                </STitleContainer>
              </SAuthor>
              <div>
                <SMainContent onClick={() => goFeedDetail(item, item.title, item.contents)}>
                  {item.contents}
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
        ))}
      </ul>
      <BottomNav />
    </SSearchLayout>
  );
};

export default SearchPage;
const SSearchLayout = styled.div`
  color: var(--white);
`;
