import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header.tsx';
import AuthenticatedHeader from './components/layout/AuthenticatedHeader.tsx';
import LoginPage from './views/registration/LoginPage.tsx';
import SignUpPage from './views/registration/SignUpPage.tsx';
import GamePage from './views/user/GamePage.tsx';
import UserPage from './views/user/UserPage.tsx';
import ErrorPage from './404.tsx';
import Showdown from './views/user/ShowdownSelectionPage.tsx';
import WinnerPage from './views/user/WinnerPage.tsx';
import EasyQuestionPage from './views/user/questionPage/EasyQuestion.tsx';
import RulesPage from './views/homepage/RulesPage.tsx';
import MediumQuestionPage from './views/user/questionPage/MediumQuestion.tsx';
import HardQuestionPage from './views/user/questionPage/HardQuestion.tsx';
import InsaneQuestionPage from './views/user/questionPage/InsaneQuestion.tsx';
import AdminPage from './views/admin/AdminPage.tsx';
import HomePage from './views/homepage/WebsitePage.tsx';
import AuthenticatedRoute from './routes/authenticatedRoute.tsx';

interface AppContentProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkAuthStatus: () => Promise<void>;
}

const AppContent: React.FC<AppContentProps> = ({ isAuthenticated, setIsAuthenticated, checkAuthStatus }) => {
    return (
        <>
        {isAuthenticated ? <AuthenticatedHeader setIsAuthenticated={setIsAuthenticated} /> : <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage checkAuthStatus={checkAuthStatus} />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route element={<AuthenticatedRoute adminOnly={false} />}>
                    <Route path="/userPage" element={<UserPage />} />
                    <Route path="/showdown" element={<Showdown />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/winner" element={<WinnerPage />} />
                    <Route path="/easyQuestion" element={<EasyQuestionPage />} />
                    <Route path="/mediumQuestion" element={<MediumQuestionPage />} />
                    <Route path="/hardQuestion" element={<HardQuestionPage />} />
                    <Route path="/insaneQuestion" element={<InsaneQuestionPage />} />
                    <Route path="/lobby" element={<GamePage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
                <Route
                    path="/adminPage"
                    element={
                    <AuthenticatedRoute adminOnly={true} />}>
                    <Route path="/adminPage" element={<AdminPage />} />
                </Route>
                    
                
        </Routes>
    </>
  );
};

export default AppContent;