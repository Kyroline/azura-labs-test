import { createContext } from "react";

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const showModal = (modal) => {

    }

    const hideModal = () => {

    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    )
}