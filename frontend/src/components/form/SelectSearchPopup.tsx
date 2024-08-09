import React, { ChangeEvent, useRef, useState } from 'react'
import InputBox from './InputBox'
import { IoChevronDown } from "react-icons/io5";
import useClickOutsideHide from '../../hooks/useClickOutsideHide';

type SelectSearchProps = {
    value: any,
    onSelect: (value: any) => void,
    data: any[],
    selected: string[],
    label?: string,
    required: boolean,
    selectItem: (item: object, index: number) => React.ReactNode,
    labelClass?: string,
    searchValue: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
}


const SelectSearchPopup: React.FC<SelectSearchProps> = ({ value, selected = [], required = false, labelClass, onSelect, data, label, selectItem, searchValue, onSearchChange }) => {
    if (selected.length != 0) {
        data = data.filter((item) => !selected.includes(item._id))
    }

    const [active, setActive] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    useClickOutsideHide(ref, () => setActive(false))
    return (
        <div className="w-full flex flex-col">
            {label ? <label className={`${labelClass} mb-1`} htmlFor="">{label} {required ? <span className='text-red-600'>*</span> : null}</label> : null}
            <div className='w-full relative p-2.5 h-fit bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md flex items-center cursor-pointer' onClick={(e) => { e.stopPropagation();setActive(true) }}>
                {value}
                <IoChevronDown className={`${active ? 'rotate-180' : ''} absolute right-2 top-0 flex h-full items-center transition-all duration-100`} />
            </div>
            <div className="w-full relative">
                <div ref={ref} className={`z-10 p-2 w-full absolute top-0 bg-white ${active ? 'max-h-48 visible' : 'max-h-0 invisible pointer-events-none'} overflow-y-auto transition-all`}>
                    <InputBox value={searchValue} onChange={onSearchChange} hideOnClick={true} placeholder='Search books here' />
                    <div className="w-full">
                        {data?.map((item, index) => selectItem(item, index))}
                        {/* <label htmlFor="hs-radio-on-right" className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                    <span className="text-sm text-gray-500 dark:text-neutral-400">Default radio</span>
                    <input type="radio" name="hs-radio-on-right" className="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-radio-on-right" />
                </label> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectSearchPopup