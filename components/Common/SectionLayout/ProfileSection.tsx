import { FunctionComponent, useState } from "react";
import { BiPencil } from 'react-icons/bi';

interface Props {

}


const ProfileIcon = () => {

    return <img className=" w-11 h-11 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
}

export const Content = () => {
    return (
        <div className="mt-12 font-Inter font-medium text-base text-carbonGrey">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="mt-2">

                <ul className="pl-4 mt-7">
                    {

                        [1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <li key={index} className="list-disc mb-6">
                                    Lorem Ipsum is simply dummy text
                                </li>
                            )
                        })

                    }
                </ul>
            </div>

        </div>
    )
}



const ProfileSection: FunctionComponent<Props> = ({ }) => {
    return (
        <div className="flex mt-3 flex-row justify-between items-center">
            <div className=" flex flex-row justify-center items-center">
                <ProfileIcon />
                <div className=" ml-4 ">
                    <span className="text-terraCotta font-Inter font-bold text-lg"> John  Smith </span>
                </div>
            </div>

            <div>
                <BiPencil />
            </div>
        </div>
    )
}

export default ProfileSection