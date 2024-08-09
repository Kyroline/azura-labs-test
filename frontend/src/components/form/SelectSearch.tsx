import React, { ChangeEvent, useState } from 'react'
import InputBox from './InputBox'
import { IoChevronDown } from "react-icons/io5";

type SelectSearchProps = {
    data: any[],
    label?: string,
    selectItem: (item: any, index: number) => React.ReactNode,
    searchValue: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


const SelectSearch: React.FC<SelectSearchProps> = ({ data, label, selectItem, searchValue, onSearchChange }) => {
    const [query, setQuery] = useState<string>('')
    const filteredData = data.filter((item) => item.toLowerCase().search(query.toLocaleLowerCase()) != -1)
    const [active, setActive] = useState(false)
    return (
        <div className="w-full">
            {label ? <label className='mb-1' htmlFor="">{label}</label> : null}
            <div className='w-full p-2.5 border border-primary rounded-md cursor-pointer relative flex items-center' onClick={() => { console.log('aa'); setActive(prev => !prev) }}>
                - - -
                <IoChevronDown className={`${active ? 'rotate-180' : ''} absolute right-2 top-0 flex h-full items-center transition-all duration-100`} />
            </div>
            <div className={`w-full transition-all p-2 ${active ? 'max-h-96 visible' : 'max-h-0 invisible pointer-events-none'}`}>
                <InputBox value={query} onChange={e => setQuery(e.target.value)} hideOnClick={true} placeholder='Search books here' />
                <div className={`w-full max-h-48  overflow-y-auto`}>
                    {filteredData.map((item, index) => selectItem(item, index))}
                </div>
            </div>
        </div>
    )
}

export default SelectSearch