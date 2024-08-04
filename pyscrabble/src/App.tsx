  import './App.css';
  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
  import Header from './components/layout/Header.tsx';
  import AuthenticatedHeader from './components/layout/AuthenticatedHeader.tsx';
  import HomePage from './views/homepage/WebsitePage.tsx';
  import LoginPage from './views/registration/LoginPage.tsx';
  import SignUpPage from './views/registration/SignUpPage.tsx';
  import GamePage from './views/user/GamePage.tsx';
  import UserPage from './views/user/UserPage.tsx';
  import ErrorPage from './404.tsx';
  import { createBrowserRouter } from 'react-router-dom';
  import Showdown from './views/user/ShowdownSelectionPage.tsx';
  import WinnerPage from './views/user/WinnerPage.tsx';
  import QrScanner from './components/layout/QRScanner.tsx';
  import EasyQuestionPage from './views/user/questionPage/EasyQuestion.tsx';
  import RulesPage from './views/homepage/RulesPage.tsx';
  import AuthenticatedRoute from './routes/authenticatedRoute.tsx';
  import MediumQuestionPage from './views/user/questionPage/MediumQuestion.tsx';
  import HardQuestionPage from './views/user/questionPage/HardQuestion.tsx';
  import InsaneQuestionPage from './views/user/questionPage/InsaneQuestion.tsx';

  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  function getLocalStorage() {
    return localStorage.getItem('token') || '';
  }

  function App() {
    const [profile, setProfile] = useState(getLocalStorage());
    console.log(profile);
    useEffect(() => {
      function updateProfile() {
        setProfile(getLocalStorage());
      }
  
      // Add event listener for storage changes
      window.addEventListener('storage', updateProfile);
  
      // Remove event listener on cleanup
      return () => window.removeEventListener('storage', updateProfile);
    }, []);
  
    // Update profile state when the component mounts
    useEffect(() => {
      setProfile(getLocalStorage());
    }, [profile]);
  
    return (
      <Router>
        {profile ? <AuthenticatedHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/showdown" element={<Showdown />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/winner" element={<WinnerPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/scan-qr" element={<QrScanner />} />
          <Route path="/easyQuestion" element={<EasyQuestionPage />} />
          <Route path="/mediumQuestion" element={<MediumQuestionPage />} />
          <Route path="/hardQuestion" element={<HardQuestionPage />} />
          <Route path="/insaneQuestion" element={<InsaneQuestionPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;