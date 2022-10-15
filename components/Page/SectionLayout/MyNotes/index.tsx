import { FunctionComponent, useState, useEffect } from "react";
import { BiPencil } from 'react-icons/bi';
import { useQuery } from "@tanstack/react-query";
import { getUserDetailsAPICall } from "services/user";
import EditorController from '../EditorController'
import { useUserController } from '@/store/user'
interface Props {

}


// export const MyNotes = () => {
//     return (
//         <div>
//             <div className="flex mt-3 flex-row justify-between items-center pr-4">
//                 <div className="">
//                     <span className="text-terraCotta font-Inter  font-normal text-lg">My Note</span>
//                 </div>
//                 <div className="">
//                     <BiPencil />
//                 </div>
//             </div>

//             <div className="mt-12 font-Inter font-medium text-base text-carbonGrey">
//                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//                 <div className="mt-2">

//                     <ul className="pl-4 mt-7">
//                         {

//                             [1, 2, 3, 4, 5].map((item, index) => {
//                                 return (
//                                     <li key={index} className="list-disc mb-6">
//                                         Lorem Ipsum is simply dummy text
//                                     </li>
//                                 )
//                             })

//                         }
//                     </ul>
//                 </div>

//             </div>
//         </div>
//     )
// }

const MyNotes: FunctionComponent<Props> = ({ }) => {
    const { isEditMode, setEditMode, handleUserNoteUpdateBtnClick } = useUserController()
    const [note, setNotes] = useState()

    const handleChange = (newState: any) => {
        setNotes(newState)
    }

    let { isLoading, data } = useQuery(['userDetails'], () =>
        getUserDetailsAPICall()
    );

    useEffect(() => {
        let note = data?.data?.personnelNote?.note
        setNotes(note)

    }, [data]
    )


    const handleSaveNotes = (localNote: any) => {
        handleUserNoteUpdateBtnClick(localNote)
    }

    return (
        <div>
            <div className="flex mt-3 flex-row justify-between items-center">
                <div className="flex flex-1 mt-3 flex-row justify-between items-center pr-4">
                    <div className="">
                        <span className="text-terraCotta font-Inter  font-normal text-lg">My Note</span>
                    </div>
                    <div className="cursor-pointer">
                        {
                            !isEditMode && <div onClick={() => {
                                setEditMode(true)
                            }}><BiPencil /></div>
                        }

                    </div>
                </div>
            </div>
            <EditorController
                note={note}
                handleSaveNotes={handleSaveNotes}
                handleChange={handleChange}
                isEditMode={isEditMode}
            />
        </div>
    )
}

export default MyNotes

