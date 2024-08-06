import React, { ChangeEvent, useState } from 'react'
import InputBox from './InputBox'

type SelectSearchProps = {
    data: object[],
    selectItem: (item: object, index: number) => React.ReactNode,
    searchValue: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


const SelectSearch: React.FC<SelectSearchProps> = ({ data, selectItem, searchValue, onSearchChange }) => {
    const [active, setActive] = useState(false)
    
    return (
        <div className="w-full">
            <h1>Category</h1>
            <InputBox value={searchValue} onChange={onSearchChange} hideOnClick={true} placeholder='Search books here' />
            <div className="w-full max-h-48 overflow-y-auto">
                {data.map((item, index) => selectItem(item, index))}
                {/* <label htmlFor="hs-radio-on-right" className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                    <span className="text-sm text-gray-500 dark:text-neutral-400">Default radio</span>
                    <input type="radio" name="hs-radio-on-right" className="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-radio-on-right" />
                </label> */}
            </div>
        </div>
    )
}

export default SelectSearch