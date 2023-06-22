import React from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setToken } from '../Atom/atom';
import { BASEURL } from '../Components/Feed/COMMON';
import { searchUserListAtom } from '../Atom/atom';

const useSearchUser = () => {
  const UserToken = useRecoilValue(setToken);
  const setUserList = useSetRecoilState(searchUserListAtom);

  const GET_instance = axios.create({
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + UserToken,
    },
  });
  async function searchUser(keyword) {
    const searchUserEndpoint = `user/searchuser/?keyword=${keyword}`;
    try {
      const response = await GET_instance.get(searchUserEndpoint);
      console.log(response.data);
      console.log(response.data.message);
      setUserList(response.data);
    } catch (error) {
      console.error(error);
      alert('잘못된 접근입니다!!!');
    }
  }

  return { searchUser };
};

export default useSearchUser;
