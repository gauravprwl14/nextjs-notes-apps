import { FunctionComponent, useState } from "react";
import { BiPowerOff } from 'react-icons/bi'
import { signOut } from 'next-auth/react';

interface Props {

}

const SideBar: FunctionComponent<Props> = ({ }) => {
    return (
        <div className="bg-red flex flex-1 h-full">
            <div className="flex-1 h-full justify-center align-middle">
                <div className="flex flex-1 h-8 justify-center align-middle" >
                    <button className="flex-1 w-full" onClick={() => signOut()}>
                        <BiPowerOff size={24} className="w-full" />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default SideBar