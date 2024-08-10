import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className: string,
    disabled?: boolean,
    buttonStyle?: keyof typeof buttonStyleList,
    buttonSize?: keyof typeof buttonSizeList
}

const buttonStyleList = {
    primary: 'bg-primary hover:bg-primary-darker text-white',
    secondary: 'bg-secondary hover:bg-secondary-darker text-white',
    tertiary: 'bg-tertiary hover:bg-tertiary-darker text-primary',
    custom: ''
};

const buttonSizeList = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-sm'
}

const Button: React.FC<ButtonProps> = ({ className, children, disabled, buttonStyle, buttonSize, ...props }) => {
    const buttonClass = `${className} ${buttonStyle ? buttonStyleList[buttonStyle] : buttonStyleList.primary} ${buttonSize ? buttonSizeList[buttonSize] : buttonSizeList.sm} ${disabled ? 'pointer-events-none' : ''}`;

    return (
        <button
            className={`${buttonClass} transition-colors font-medium cursor-pointer`}
            {...props}>
            {children}
        </button>
    )
}

export default Button;
