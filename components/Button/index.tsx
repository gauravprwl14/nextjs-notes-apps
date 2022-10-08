import React from 'react'


export const Button = ({ children, onClick, layoutClass = "", btnClass = "" }: IButtonProps) => {
    return (
        <div className={`flex cursor-pointer flex-row flex-1 mx-2 ${layoutClass}`} onClick={onClick}>
            <div className="w-full block mt-1">
                <div className={`text-white bg-terraCotta hover:bg-terraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-terraCotta dark:hover:bg-terraCotta dark:focus:ring-blue-800 ${btnClass}`}> {children} </div>
            </div>
        </div>
    )
}

interface IButtonProps {
    children: React.ReactNode;
    layoutClass?: String;
    btnClass?: String;
    onClick: () => void
}

export default Button