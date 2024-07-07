import React from 'react';
import MenuButton from '../../components/ui/MenuButton.tsx';
import JoinGameLogo from '../../assets/buttonLogo/joingame-logo.svg'
import CreateRoomLogo from '../../assets/buttonLogo/createroom-logo.svg'
import { Button } from '../../components/ui/Button.tsx';


const ShowdownSelectionPage = () => {
    return (
        <div className="montserrat flex flex-col items-end justify-center min-h-screen bg-gray-900">
            <Button/>
            <div className="flex flex-col gap-y-4">
                <MenuButton 
                    bgColor='bg-[#BB5C17]' 
                    textColor='text-[#F7BD93]' 
                    title='JOIN GAME!' 
                    logoPath={JoinGameLogo} 
                    logoDesc='Join Game logo'  
                />
                <MenuButton 
                    bgColor='bg-[#952525]' 
                    textColor='text-[#FC7B7B]' 
                    title='CREATE GAME!' 
                    logoPath={CreateRoomLogo} 
                    logoDesc='Create Room logo'  
                />
            </div>
        </div>
    );
}

export default ShowdownSelectionPage;
