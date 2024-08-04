import React from 'react';
import { Button } from "../../components/ui/Button.tsx";
import scrabble from '../../assets/scrabble.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <section className='flex flex-col items-center mt-28 gap-10'>
            <div className='flex flex-col lg:flex-row justify-between items-center lg:w-[85%] gap-10 lg:gap-0'>
                <div className='flex flex-col gap-6 text-center lg:text-left text-[#B0ACF6] lg:w-1/2'>
                    <span className="pixel-font text-[2.5rem] rainbow-text font-extrabold">PYSCRABBLE SHOWDOWN!</span>
                    <span className='robotto text-[1.875rem] font-bold'>Challenge your friends to a Python quiz with a Scrabble twist</span>
                    <Button onClick={() => navigate('/signup')} className='w-52 h-20 mx-auto lg:mx-0'>SIGN UP NOW!</Button>
                </div>
                <img src={scrabble} alt="Scrabble" className='w-full lg:w-2/5 h-auto lg:h-auto' />
            </div>
            <Button className='w-full lg:w-auto px-10 lg:px-20' onClick={() => navigate('/rules')}>CHECK OUT THE GAME RULES!</Button>
        </section>
    );
}

export default HomePage;
