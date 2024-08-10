import React, { ChangeEvent, useState } from 'react'
import InputBox from './InputBox'
import { IoChevronDown } from "react-icons/io5";

type SelectSearchProps = {
    value: any,
    selected: any,
    data: any[],
    label?: string,
    selectItem: (item: any, index: number) => React.ReactNode,
    searchValue: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


const SelectSearch: React.FC<SelectSearchProps> = ({ selected, value, data, label, selectItem, searchValue, onSearchChange }) => {
    const [query, setQuery] = useState<string>('')
    if (selected.length != 0)
        data = data?.filter((item) => !selected.includes(item._id))
    data = data?.filter((item) => item.title.toLowerCase().search(query.toLocaleLowerCase()) != -1)
    const [active, setActive] = useState(false)
    return (
        <div className="w-full">
            {label ? <label className='mb-1' htmlFor="">{label}</label> : null}
            <div className='w-full p-2.5 border border-primary rounded-md cursor-pointer relative flex items-center' onClick={() => { console.log('aa'); setActive(prev => !prev) }}>
                {value}
                <IoChevronDown className={`${active ? 'rotate-180' : ''} absolute right-2 top-0 flex h-full items-center transition-all duration-100`} />
            </div>
            <div className={`w-full transition-all p-2 ${active ? 'max-h-96 visible' : 'max-h-0 invisible pointer-events-none'}`}>
                <InputBox value={query} onChange={e => setQuery(e.target.value)} hideOnClick={true} placeholder='Search books here' />
                <div className={`w-full max-h-48  overflow-y-auto`}>
                    {data?.map((item, index) => selectItem(item, index))}
                </div>
            </div>
        </div>
    )
}

export default SelectSearch