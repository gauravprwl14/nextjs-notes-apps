import { FunctionComponent, useState } from "react";
import { BiPencil } from 'react-icons/bi';

interface Props {

}


export const MyNotes = () => {
    return (
        <div>
            <div className="flex mt-3 flex-row justify-between items-center pr-4">
                <div className="">
                    <span className="text-terraCotta font-Inter  font-normal text-lg">My Note</span>
                </div>
                <div className="">
                    <BiPencil />
                </div>
            </div>

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
        </div>
    )
}

export default MyNotes