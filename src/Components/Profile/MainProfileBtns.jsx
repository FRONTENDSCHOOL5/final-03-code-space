import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import iconChat from 'assets/icons/chat.png';
import iconShare from 'assets/icons/share.png';
import Button from 'Components/Common/Button';
import { useRecoilValue } from 'recoil';
import { setToken } from 'Atom/atomStore';
import axios from 'axios';
import { removeFollowerById } from 'Components/Profile/removeMainAccount';

export default function MainProfileBtns({
  accountName,
  isSubscribed,
  setIsSubscribed,
  isMyProfile,
  setFollowerCount,
  setIsClickFollow,
}) {
  const token = useRecoilValue(setToken);
  const URL = 'https://api.mandarin.weniv.co.kr';
  const navigate = useNavigate();

  //

  // setIsSubscribed(isfollow);

  async function handleClick() {
    if (isSubscribed === false) {
      //   팔로워 추가해주기 -> api 요청
      const reqPath = `/profile/${accountName}/follow`;
      try {
        const response = await axios(URL + reqPath, {
          method: 'post',
          headers: {
            // 프로필 정보 요청 (토큰 필요)
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });
        const followrUpdate = removeFollowerById(response.data.profile, '6494255eb2cb20566369fa5c');
        setIsSubscribed(followrUpdate.isfollow);
        setFollowerCount(followrUpdate.followerCount);
        setIsClickFollow(true);
      } catch (error) {}
    } else if (isSubscribed) {
      //   팔로워 제거해주기 -> api 요청
      const reqPath = `/profile/${accountName}/unfollow`;
      try {
        const response = await axios(URL + reqPath, {
          method: 'DELETE',
          headers: {
            // 프로필 정보 요청 (토큰 필요)
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });
        const followrUpdate = removeFollowerById(response.data.profile, '6494255eb2cb20566369fa5c');
        setIsSubscribed(followrUpdate.isfollow);
        setFollowerCount(followrUpdate.followerCount);
        setIsClickFollow(true);
        //
      } catch (error) {}
    }
  }

  // 공유 버튼 누르면 링크 복사
  const handleCopyClipBoard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {}
  };

  return (
    <>
      {isMyProfile ? (
        <SBtnLayout>
          <Button width="120px" myProfileBtn={true} padding="8px 0">
            <Link to="/editprofile">프로필 수정</Link>
          </Button>
          <Button width="100px" myProfileBtn={true} padding="8px 0">
            <Link to="/product">상품 등록</Link>
          </Button>
        </SBtnLayout>
      ) : (
        <SBtnContainer>
          <SChatBtn onClick={() => navigate('/messagelist')} />
          <Button width="120px" onClick={handleClick} subscribed={isSubscribed} padding="8px 0">
            {isSubscribed ? '언팔로우 ' : '팔로우'}
          </Button>
          <SShareBtn onClick={handleCopyClipBoard} />
        </SBtnContainer>
      )}
    </>
  );
}

const SBtnLayout = styled.div`
  text-align: center;

  button:first-child {
    margin-right: 12px;
  }
`;

const SBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const SChatBtn = styled.button`
  background: url(${iconChat}) no-repeat center/ 15px 15px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border-gray);
  border-radius: 50%;
`;

const SShareBtn = styled(SChatBtn)`
  background: url(${iconShare}) no-repeat center/ 20px 20px;
`;
