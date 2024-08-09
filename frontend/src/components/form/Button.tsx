import React, { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
    className: string,
    title: string | ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    style?: keyof typeof buttonStyle,
    size?: keyof typeof buttonSize
}

const buttonStyle = {
    primary: 'bg-primary hover:bg-primary-darker text-white',
    secondary: 'bg-secondary hover:bg-secondary-darker text-white',
    tertiary: 'bg-tertiary hover:bg-tertiary-darker text-primary',
    custom: ''
};

const buttonSize = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-sm'
}

const Button: React.FC<ButtonProps> = ({ className, title, onClick, disabled, style, size }) => {
    const buttonClass = `${className} ${style ? buttonStyle[style] : buttonStyle.primary} ${size ? buttonSize[size] : buttonSize.sm} ${disabled ? 'pointer-events-none' : ''}`;

    return (
        <button onClick={onClick} className={`${buttonClass} transition-colors font-medium cursor-pointer`}>{title}</button>
    )
}

export default Button;
