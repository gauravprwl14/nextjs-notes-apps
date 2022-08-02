import React, { FunctionComponent, useState } from "react";
import SideBar from '../Sidebar'


interface Props {
    children: React.ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="flex w-full h-full flex-1 min-h-screen min-w-full">
            <div className="w-14 bg-elephant">
                <SideBar />
            </div>

            <div className="content w-full">
                {children}
            </div>
        </div>
    )
}

export default Layout