import React from 'react';
import { Button } from "../../components/ui/Button.tsx"
import scrabble from '../../assets/scrabble.png'

const HomePage = () => {
    return (
        <section className='flex justify-center items-center flex-col mt-28 gap-10  '>
            <div className='flex justify-between w-[85%] '>
                <div className='flex flex-col gap-10 text-[#B0ACF6] w-[50%] '>
                    <span className="pixel-font text-[2.5rem] rainbow-text font-extrabold">PYSCRABBLE SHOWDOWN!</span>
                    <span className='robotto text-[30px] font-bold'>Challenge your friends to a Python quiz with a Scrabble twist</span>
                    <Button className=' w-[208px] h-[80px]'>    SIGN UP NOW!</Button>
                </div>
                <img src={scrabble} alt="Logo"  />
            </div>
            
            <Button className='px-52'>CHECK OUT THE GAME RULES!</Button>
        </section>
    )   


}

export default HomePage;