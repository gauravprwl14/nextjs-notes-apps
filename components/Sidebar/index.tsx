
import { FunctionComponent, useState } from "react";
import { BiPowerOff } from 'react-icons/bi'
import { FaUserPlus, FaBookOpen } from 'react-icons/fa'
import { signOut } from 'next-auth/react';
import Link from "next/link";

interface Props {

}


interface ISideBarButtonProps {
    children: React.ReactNode;
    btnClick?: () => void
}

const SideBarButton = ({ children, btnClick, ...props }: ISideBarButtonProps) => {
    return (
        <button className="flex-1 w-full my-2 " onClick={btnClick} {...props}>
            {children}
        </button>

    )
}

const SideBar: FunctionComponent<Props> = ({ }) => {
    return (
        <div className="bg-red flex flex-1 h-full">
            <div className="flex-1 h-full justify-center align-middle">
                <div className="flex flex-1 justify-center align-middle flex-col " >

                    {/* <Link href="/users">
                        <SideBarButton>
                            <FaUserPlus size={20} className="w-full" />
                        </SideBarButton>
                    </Link>


                    <Link href="/notes">
                        <SideBarButton>
                            <FaBookOpen size={20} className="w-full" />
                        </SideBarButton>
                    </Link> */}


                    <SideBarButton btnClick={() => signOut()}>
                        <BiPowerOff size={24} className="w-full" />
                    </SideBarButton>

                </div>
            </div>
        </div>
    )
}

export default SideBar