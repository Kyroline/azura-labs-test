import React, { FocusEventHandler, useRef, useState } from 'react'
import InputBox from './InputBox'
import useClickOutsideHide from '../../hooks/useClickOutsideHide'

interface AutoCorrectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    data: any[],
    minimalLength: number
    onSelectClick: (value: any) => void,
    label: any,
    limit: number,
    hideOnClick: boolean,
    value: any,
    onChange: () => void
}

const AutoCorrectInput: React.FC<AutoCorrectInputProps> = ({ data, minimalLength = 3, onSelectClick, label = undefined, limit = null, hideOnClick = true, ...props }) => {
    const [active, setActive] = useState(false)
    const ref = useRef(null)

    useClickOutsideHide(ref, () => setActive(false))
    data = data?.filter((item) => (item._id.toLowerCase().search(props.value.toLowerCase()) != -1))
    return (
        <div className="flex flex-col">
            <InputBox
                onFocusDo={() => setActive(true)}
                label={label}
                hideOnClick={hideOnClick}
                {...props} />
            <div className="relative flex">
                {
                    (props?.value.length > minimalLength - 1 && active && data?.length > 0) ?
                        <div ref={ref} className={`z-10 p-2 w-full absolute top-0 bg-white ${active ? 'max-h-48 visible' : 'max-h-0 invisible pointer-events-none'} overflow-y-auto transition-all`}>
                            <div className="w-full">
                                {data?.map((item, index) =>
                                    <label onClick={() => { onSelectClick(item._id); setActive(false) }} className="cursor-pointer flex group p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                                        <span className="text-sm text-gray-500 group-hover:text-primary">{item._id} ({item.count})</span>
                                    </label>)}
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default AutoCorrectInput