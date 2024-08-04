  import './App.css';
  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Header from './components/layout/Header.tsx';
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

  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  function App() {
    return (
      <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/404" element={<ErrorPage />} />
              <Route path="/userPage" element={<UserPage />} />
              <Route path="/showdown" element={<Showdown />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/winner" element={<WinnerPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/scan-qr" element={<QrScanner />} />
              <Route path="/easyQuestion" element={<EasyQuestionPage />} />
            </Routes>
      </Router>
        

    );
  }

  export default App;
