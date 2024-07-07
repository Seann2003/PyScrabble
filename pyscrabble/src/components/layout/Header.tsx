import React from 'react';
import logo from '../../assets/app-logo.png';
import { Button } from "../ui/Button.tsx"
import { Link } from 'react-router-dom';
import EnterCode from './EnterCode.tsx';

const Header = () => {
    return (
        <div className='px-9 py-3 text-white pixel-font bg-[#282646] flex justify-between items-center'>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <div className='flex gap-5'>
                <EnterCode/>
                <Link to="/login">
                    <Button>LOG IN</Button>
                </Link>
                <Link to="/signup">
                    <Button>SIGN UP</Button>
                </Link>
            </div>
        </div>
    )


}

export default Header;