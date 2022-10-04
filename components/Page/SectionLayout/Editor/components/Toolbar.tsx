import React, { Children, FunctionComponent, useState } from "react";
import { BiPencil } from 'react-icons/bi';

interface ToolBarProps {

}

interface MenuProps {

}



const Menu: FunctionComponent<React.PropsWithChildren & MenuProps> = ({ children }) => {
    return (

        <div className="flex justify-around relative py-4 pl-2 pr-4 border-b-2 -mr-6 -ml-6 mb-2">
            {children}
        </div>

    )
}
export const Toolbar: FunctionComponent<React.PropsWithChildren & ToolBarProps> = ({ children }) => {
    return (

        <Menu>
            {children}
        </Menu>

    )
}

export default Toolbar