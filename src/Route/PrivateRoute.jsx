import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setIsLogined, isLoginAlertAtom } from 'Atom/atomStore';

const PrivateRoute = ({ element }) => {
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
