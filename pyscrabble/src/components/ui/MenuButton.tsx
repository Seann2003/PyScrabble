import React from 'react';

interface MenuButtonProps {
    bgColor: string,
    textColor: string,
    title: string,
    logoPath: string,
    logoDesc: string,
    onClick?: () => void,
}

const MenuButton: React.FC<MenuButtonProps> = ({ bgColor, textColor, title, logoPath, logoDesc, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className={`flex items-center justify-start w-full max-w-[91vw] lg:h-[120px] h-[100px] px-4 py-4 mb-2 font-bold text-left ${bgColor} ${textColor} rounded shadow-lg hover:bg-opacity-70
            sm:w-[80vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw]`}
        >
            <img 
                src={logoPath} 
                alt={logoDesc} 
                className="w-1/4 h-auto mr-4 md:w-1/6 lg:w-1/8" 
            />
            <span className="text-wrap text-xl md:text-2xl lg:text-3xl xl:text-4xl ml-2 md:ml-4 lg:ml-6 xl:ml-8">{title}</span>
        </button>
    );
}

export default MenuButton;
