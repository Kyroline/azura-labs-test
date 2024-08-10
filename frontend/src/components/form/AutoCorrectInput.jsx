import React, { useRef, useState } from 'react'
import InputBox from './InputBox'
import useClickOutsideHide from '../../hooks/useClickOutsideHide'


const AutoCorrectInput = ({ data, onSelectClick, className = null, label = undefined, autoFocus = false, type = 'text', value, onChange, placeholder = null, readOnly = false, required = false, limit = null, hideOnClick = true }) => {
    const [active, setActive] = useState(false)
    const ref = useRef(null)

    useClickOutsideHide(ref, () => setActive(false))
    data = data.filter((item) => (item._id.toLowerCase().search(value.toLowerCase()) != -1))
    return (
        <div className="flex flex-col">
            <InputBox
                onFocus={() => { setActive(true) }}
                // onBlur={() => { setActive(false) }}
                className={className}
                value={value}
                onChange={onChange}
                label={label}
                hideOnClick={hideOnClick}
                autoFocus={autoFocus}
                placeholder={placeholder}
                readOnly={readOnly}
                required={required} />
            <div className="relative flex">
                {
                    (value.length > 2 && active && data?.length > 0) ?
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