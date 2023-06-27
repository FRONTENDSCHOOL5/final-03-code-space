import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setIsLogined, isLoginAlertAtom } from 'Atom/atomStore';
import AlertModal from 'Components/Common/AlertModal';

const PrivateRoute = ({ path, element }) => {
  const isLoginSuccess = useRecoilValue(setIsLogined);
  const isLoginAlert = useSetRecoilState(isLoginAlertAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoginSuccess) {
      navigate('/');
      isLoginAlert(true);
    }
  }, [navigate]);
  return <>{isLoginSuccess ? element : <Navigate to="/" replace />}</>;
};
export default PrivateRoute;
