import React from 'react';

interface MenuButtonProps {
    bgColor: string,
    textColor: string,
    title: string,
    logoPath: string,
    logoDesc: string
}

const MenuButton: React.FC<MenuButtonProps> = ({ bgColor, textColor, title, logoPath, logoDesc }) => {
    return (
        <button className={`flex items-center justify-start w-[61vw] h-[120px] px-4 py-4 mb-2 font-bold text-left ${bgColor} ${textColor} rounded shadow-lg hover:bg-opacity-80`}>
            <img src={logoPath} alt={logoDesc} className="" />
            <span className="text-7xl ml-5">{title}</span>
        </button>
    );
}

export default MenuButton;
