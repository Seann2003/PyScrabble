import React from 'react';
import MenuButton from '../../components/ui/MenuButton.tsx';
import EnterCodeShowdown from '../../components/layout/EnterCodeShowdown.tsx';
import CreateRoomLogo from '../../assets/buttonLogo/createroom-logo.svg'
import { Button } from '../../components/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';
import KirbyAnimation from '../../assets/kirby-gif.gif'
import CreateRoomDialog from '../../components/layout/CreateRoomDialog.tsx';
import KirbyFlyingAnimation from '../../assets/kirby-flying.gif'

const ShowdownSelectionPage = () => {
    const navigate = useNavigate();
    return (            
        <>
            <div className="montserrat flex flex-col lg:items-center items-end lg:flex-row lg:justify-between min-h-screen bg-gray-900">
                <Button onClick={() => navigate('/userPage')} className='bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-start mt-10 w-36 h-auto rounded-none' size={'lg'}> Back</Button>
                <img src = {KirbyAnimation} alt = "Kirby Animation" className='w-1/5 h-auto' />
                <img src = {KirbyFlyingAnimation} alt = "Kirby Flying Animation" className='w-1/5 h-auto' />
                <div className="flex flex-col gap-y-4">
                    <EnterCodeShowdown/>
                    <CreateRoomDialog button={
                        <MenuButton 
                            bgColor='bg-[#952525]' 
                            textColor='text-[#FC7B7B]' 
                            title='CREATE GAME!' 
                            logoPath={CreateRoomLogo} 
                            logoDesc='Create Room logo'  
                        />
                    } />
                </div>
            </div>
        </>
    );
}

export default ShowdownSelectionPage;
