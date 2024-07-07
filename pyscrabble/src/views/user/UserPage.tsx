import React from 'react';
import MenuButton from '../../components/ui/MenuButton.tsx';
import ShowdownLogo from '../../assets/buttonLogo/showdown-logo.svg'
import HomeLogo from '../../assets/buttonLogo/home-logo.svg'
import LeaderboardLogo from '../../assets/buttonLogo/leaderboard-logo.svg'
import RulesLogo from '../../assets/buttonLogo/rules-logo.svg'

const UserPage = () => {
    return (
        <div className="montserrat flex flex-col items-end justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col gap-y-4">
                <MenuButton 
                    bgColor='bg-[#670F45]' 
                    textColor='text-[#E3A6CB]' 
                    title='SHOWDOWN!' 
                    logoPath={ShowdownLogo} 
                    logoDesc='Showdown logo'  
                />
                <MenuButton 
                    bgColor='bg-[#161440]' 
                    textColor='text-[#466CCE]' 
                    title='HOME' 
                    logoPath={HomeLogo} 
                    logoDesc='Home logo'  
                />
                <MenuButton 
                    bgColor='bg-[#103F23]' 
                    textColor='text-[#24C163]' 
                    title='LEADERBOARD' 
                    logoPath={LeaderboardLogo} 
                    logoDesc='Leaderboard logo'  
                />
                <MenuButton 
                    bgColor='bg-[#320F60]' 
                    textColor='text-[#CA74FF]' 
                    title='RULES' 
                    logoPath={RulesLogo} 
                    logoDesc='Rules logo'  
                />
            </div>
        </div>
    );
}

export default UserPage;
