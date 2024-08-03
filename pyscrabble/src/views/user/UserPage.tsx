import React from 'react';
import MenuButton from '../../components/ui/MenuButton.tsx';
import ShowdownLogo from '../../assets/buttonLogo/showdown-logo.svg'
import HomeLogo from '../../assets/buttonLogo/home-logo.svg'
import LeaderboardLogo from '../../assets/buttonLogo/leaderboard-logo.svg'
import RulesLogo from '../../assets/buttonLogo/rules-logo.svg'
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    const handleShowdown = () => {
        navigate('/showdown');
    }
    return (
        <div className="montserrat flex flex-col items-end justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col gap-y-4">
                <MenuButton 
                    bgColor='bg-[#670F45]' 
                    textColor='text-[#E3A6CB]' 
                    title='SHOWDOWN!' 
                    logoPath={ShowdownLogo} 
                    logoDesc='Showdown logo' 
                    onClick = {handleShowdown} 
                />
                <MenuButton 
                    bgColor='bg-[#171e69]' 
                    textColor='text-[#466CCE]' 
                    title='HOME' 
                    logoPath={HomeLogo} 
                    logoDesc='Home logo'  
                    onClick = {handleShowdown} 
                />
                <MenuButton 
                    bgColor='bg-[#103F23]' 
                    textColor='text-[#24C163]' 
                    title='LEADERBOARD' 
                    logoPath={LeaderboardLogo} 
                    logoDesc='Leaderboard logo'  
                    onClick = {handleShowdown} 

                />
                <MenuButton 
                    bgColor='bg-[#320F60]' 
                    textColor='text-[#CA74FF]' 
                    title='RULES' 
                    logoPath={RulesLogo} 
                    logoDesc='Rules logo'  
                    onClick = {handleShowdown} 
                />
            </div>
        </div>
    );
}

export default UserPage;
