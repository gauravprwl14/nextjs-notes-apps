import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { FaSort, FaCheck } from 'react-icons/fa';
import { IConnectionDetails } from '@/types/note';


const people = [
    { _id: 1, name: 'Wade Cooper' },
    { _id: 2, name: 'Arlene Mccoy' },
    { _id: 3, name: 'Devon Webb' },
    { _id: 4, name: 'Tom Cook' },
    { _id: 5, name: 'Tanya Fox' },
    { _id: 6, name: 'Hellen Schmidt' },
]


interface ISelectSearchProps {
    data: IConnectionDetails[] | [] | null
    selected: IConnectionDetails | null
    setSelected: (connectionObj: IConnectionDetails) => void
}

export default function SelectSearch({ data = [], selected, setSelected }: ISelectSearchProps) {
    // const [selected, setSelected] = useState<IConnectionDetails | null>(data?.[0])
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (!selected && data?.length) {
            setSelected(data[0])
        }

        // TODO
        // return () => {

        //     setSelected(null)
        // }

    }, [data])


    const onSelect = (selectedPerson: IConnectionDetails) => {
        setSelected(selectedPerson)
    }


    let filteredPeople =
        query === ''
            ? data
            : data?.filter((person: IConnectionDetails) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    filteredPeople = filteredPeople || []

    return (
        <div className="w-full flex">
            <Combobox value={selected} onChange={onSelect}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 leading-5 focus:outline-none text-terraCotta font-Inter font-bold text-lg"
                            // TODO
                            displayValue={(person: IConnectionDetails) => (person?.name || "-") as string}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <FaSort
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person: IConnectionDetails, index) => (
                                    <Combobox.Option
                                        key={person?._id || index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-silverChalice text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person?.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-terraCotta'
                                                            }`}
                                                    >
                                                        <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}