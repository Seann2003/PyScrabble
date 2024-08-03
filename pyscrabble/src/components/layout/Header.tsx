import React, { useState } from 'react';
import logo from '../../assets/app-logo.png';
import { Button } from '../ui/Button.tsx';
import { Link } from 'react-router-dom';
import EnterCode from './EnterCode.tsx';
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='px-4 py-3 text-white pixel-font bg-[#282646] flex justify-between items-center'>
            <Link to="/">
                <img src={logo} alt="Logo" className="h-9 md:h-10" />
            </Link>
            <div className='hidden md:flex gap-5 items-center'>
                <EnterCode />
                <Link to="/login">
                    <Button>LOG IN</Button>
                </Link>
                <Link to="/signup">
                    <Button>SIGN UP</Button>
                </Link>
            </div>
            <div className='md:hidden'>
                <button onClick={toggleMenu} className='focus:outline-none'>
                    {isOpen ? (
                        <IoMdClose className="w-9 h-9 text-white" />
                    ) : (
                        <IoMdMenu className="w-9 h-9 text-white" />
                    )}
                </button>
            </div>
            {isOpen && (
                <div className='absolute top-12 left-0 right-0 bg-[#282646] p-4 flex flex-col items-center md:hidden'>
                    <EnterCode />
                    <Link to="/login" className='w-full'>
                        <Button className='w-full mt-2'>LOG IN</Button>
                    </Link>
                    <Link to="/signup" className='w-full'>
                        <Button className='w-full mt-2'>SIGN UP</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
