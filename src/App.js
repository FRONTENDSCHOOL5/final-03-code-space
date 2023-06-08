import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import BottomNav from './Components/Common/BottomNav';
import MainHeader from './Components/Common/MainHeader';
import LoginHeader from './Components/Common/LoginHeader';
import MainPage from './Pages/MainPage';
function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/btmnav" element={<BottomNav />} />
        <Route path="/loginheader" element={<LoginHeader />} />
        <Route path="/mainheader" element={<MainHeader />} />
      </Routes>
    </div>
  );
}
export default App;
