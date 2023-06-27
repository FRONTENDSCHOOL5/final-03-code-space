import axios from 'axios';

export async function AddFollow(accountName, token) {
  //   팔로워 추가해주기 -> api 요청
  const URL = 'https://api.mandarin.weniv.co.kr';
  const reqPath = `/profile/${accountName}/follow`;
  try {
    const response = await axios(URL + reqPath, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
  } catch (error) {}
}

export async function DeleteFollow(accountName, token) {
  //   팔로워 제거해주기 -> api 요청
  const URL = 'https://api.mandarin.weniv.co.kr';
  const reqPath = `/profile/${accountName}/unfollow`;
  try {
    const response = await axios(URL + reqPath, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
  } catch (error) {}
}
