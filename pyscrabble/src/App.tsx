  import './App.css';
  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Header from './components/layout/Header.tsx';
  import HomePage from './views/homepage/WebsitePage.tsx';
  import LoginPage from './views/registration/LoginPage.tsx';
  import SignUpPage from './views/registration/SignUpPage.tsx';
  import EnterCode from './components/layout/EnterCode.tsx';
  import GamePage from './views/user/GamePage.tsx';

  function App() {
    return (
      <Router>
            <Header />
            {/* <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/enter-code" element={<EnterCode />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes> */}
            <GamePage/>
      </Router>
        

    );
  }

  export default App;
