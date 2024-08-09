import React, { ChangeEvent, useState } from 'react'

type InputBoxProps = {
    className?: string,
    label?: string
    autoFocus?: boolean,
    type?: string,
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    readOnly?: boolean,
    required?: boolean,
    limit?: number,
    hideOnClick?: boolean
}

const InputBox: React.FC<InputBoxProps> = ({ className = null, label = undefined, autoFocus = false, type = 'text', value, onChange, placeholder = null, readOnly = false, required = false, limit = null, hideOnClick = true }) => {
    const [focus, setFocus] = useState(false)

    const onValue = (e) => {
        if (!limit) {
            onChange(e)
            return
        }

        if (e.target.value.length > limit)
            return
        onChange(e)

    }//top-4
    return (
        <>
            {label ? <label className='mb-2 ml-2 text-primary'>{label} {required ? <span className='text-red-600'>*</span> : null}</label> : null}
            <div className={'relative p-2.5 h-fit bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md flex items-center ' + className}>
                <label className={`absolute pointer-events-none left-5 font-light focus transition-all ${focus || value != '' ? !hideOnClick ? '-translate-y-3 text-xs' : 'opacity-0' : 'text-base'}`}>{placeholder}{required && !label ? <span className='text-red-600'>*</span> : null}</label>
                <input
                    autoFocus={autoFocus ?? false}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    readOnly={readOnly}
                    required={required}
                    value={value}
                    onChange={onValue}
                    type={type ?? 'text'}
                    style={{ border: 'none', outline: 'none' }}
                    className={`bg-transparent border-none outline-none focus:border-none focus:outline-none ring-0 focus:ring-0 w-full`} />
            </div>
            {limit ? <div className="flex justify-end mb-4 text-xs">
                <span>{value ? value.length : 0}/{limit}</span>
            </div> : null}
        </>
    )
}

export default InputBox