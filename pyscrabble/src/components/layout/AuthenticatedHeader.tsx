import React, { useState } from 'react';
import logo from '../../assets/app-logo.png';
import { Button } from '../ui/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import EnterCode from './EnterCode.tsx';
import { IoMdMenu } from "react-icons/io";
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

interface AuthenticatedHeaderProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ setIsAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const handleLogout = () =>{
        axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
            .then((response) => {
                console.log(response.data.message);
                setIsAuthenticated(false);
                navigate('/'); // Redirect to the login page
            })
            .catch((error) => {
                console.error('There was an error logging out!', error);
            });
    }

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
                <Button onClick={handleLogout}>LOGOUT</Button>
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
                        <Button onClick={handleLogout} className='w-full mt-2'>LOGOUT</Button>
                </div>
            )}
        </div>
    )


}

export default AuthenticatedHeader;