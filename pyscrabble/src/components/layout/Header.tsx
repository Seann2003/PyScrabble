import React from 'react';
import logo from '../../assets/app-logo.png';
import { Button } from "../ui/Button.tsx"


const Header = () => {
    return (
        <div className=' px-9 py-3 text-white pixel-font bg-[#282646] flex justify-between  items-center'>
            <img src={logo} alt="Logo" />
            <div className=' flex gap-5 '>
                <Button>ENTER CODE</Button>
                <Button>LOG IN</Button>
                <Button>SIGN UP</Button>
            </div>

        </div>
    )


}

export default Header;