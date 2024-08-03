import React from 'react';
import MenuButton from '../../components/ui/MenuButton.tsx';
import JoinGameLogo from '../../assets/buttonLogo/joingame-logo.svg'
import CreateRoomLogo from '../../assets/buttonLogo/createroom-logo.svg'
import { Button } from '../../components/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';


const ShowdownSelectionPage = () => {
    const navigate = useNavigate();
    return (            
        <>
            <div className="montserrat flex flex-col items-end  min-h-screen bg-gray-900">
                <Button onClick={() => navigate('/userPage')} className='bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-start mt-10 w-36 h-auto rounded-none' size={'lg'}> Back</Button>
                <div className="flex flex-grow justify-center flex-col gap-y-4">
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
