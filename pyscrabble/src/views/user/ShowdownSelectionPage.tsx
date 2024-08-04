import React from 'react';
import MenuButton from '../../components/ui/MenuButton.tsx';
import JoinGameLogo from '../../assets/buttonLogo/joingame-logo.svg'
import CreateRoomLogo from '../../assets/buttonLogo/createroom-logo.svg'
import { Button } from '../../components/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';
import KirbyAnimation from '../../assets/kirby-gif.gif'


const ShowdownSelectionPage = () => {
    const navigate = useNavigate();
    return (            
        <>
            <div className="montserrat flex flex-col lg:items-center items-end lg:flex-row lg:justify-between min-h-screen bg-gray-900">
                <img src = {KirbyAnimation} alt = "Kirby Animation" className='w-1/4 h-auto' />

                <div className="flex flex-col gap-y-4">
                    <MenuButton 
                        bgColor='bg-[#BB5C17]' 
                        textColor='text-[#F7BD93]' 
                        title='JOIN GAME!' 
                        logoPath={JoinGameLogo} 
                        logoDesc='Join Game logo'
                        onClick={() => navigate('/game')}  
                    />
                    <MenuButton 
                        bgColor='bg-[#952525]' 
                        textColor='text-[#FC7B7B]' 
                        title='CREATE GAME!' 
                        logoPath={CreateRoomLogo} 
                        logoDesc='Create Room logo'  
                        onClick={() => navigate('/game')}  
                    />
                </div>
            </div>
        </>
    );
}

export default ShowdownSelectionPage;
