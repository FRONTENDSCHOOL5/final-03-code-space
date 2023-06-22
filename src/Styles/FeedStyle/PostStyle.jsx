import styled from 'styled-components';

const STitle = styled.div`
  color: var(--white);
  word-break: break-all;
  font-weight: bold;
`;
const SMainContent = styled.div`
  color: var(--white);
  font-size: 14px;
  margin: 10px 5px;
  box-sizing: border-box;
  word-break: break-all;
  line-height: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
const SContent = styled.div`
  color: var(--white);
  font-size: 14px;
  margin: 10px 5px;
  box-sizing: border-box;
  word-break: break-all;
  line-height: 16px;
`;
const SUserName = styled.div`
  color: var(--lightgray);
  word-break: break-all;
  font-size: 13px;
`;
const SAccountname = styled.div`
  color: var(--darkgray);
  font-size: 10px;
`;

const SFeedCard = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid var(--border-gray);

  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;
`;
const SDetailFeedCard = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid var(--border-gray);
  padding: 20px;
  box-sizing: border-box;
`;
const SAuthor = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;
const SProfileImg = styled.img`
  max-width: 46px;
  max-height: 46px;
  width: 100%;
  height: 100%;
  border: none;
`;
const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`;
const SHeartImg = styled.img`
  max-width: 15px;
  max-height: 15px;
  width: 100%;
  height: 100%;
  fill: var(--point-color);
`;
const SHeartImgDetail = styled.img`
  max-width: 15px;
  max-height: 15px;
  width: 100%;
  height: 100%;
  fill: var(--point-color);

  &:hover {
    scale: 1.2;
  }
`;
const SReactionContainer = styled.div`
  display: flex;
  color: var(--lightgray);
  justify-content: space-between;
  padding-right: 10px;
  align-items: end;
  text-align: center;
  gap: 16px;
`;
const SReactionContent = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  padding: 5px;
`;
const SReactionCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  text-align: center;
  gap: 5px;
  div {
    text-align: center;
  }
`;
const SPostImage = styled.img`
  max-width: 390px;
  width: 100%;
  border-radius: 20px;
`;
const SCodeEditor = styled.div`
  font-size: 10px;
`;
export {
  SFeedCard,
  STitle,
  SContent,
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
  SDetailFeedCard,
  SMainContent,
  SPostImage,
  SHeartImgDetail,
  SCodeEditor,
};
