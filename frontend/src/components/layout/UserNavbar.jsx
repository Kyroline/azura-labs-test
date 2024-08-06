import { useState } from "react"
import InputBox from "../form/InputBox"

const UserNavbar = () => {
    const [search, setSearch] = useState('')
    return (
        <nav className="z-30 fixed inset-0 h-fit w-screen justify-between bg-primary text-white flex flex-col items-center px-4 sm:px-12">
            <div className="h-16 flex flex-row w-full items-center">
                <h1 className="font-playfair-display font-medium text-3xl sm:pr-12">AzuraBook</h1>
                <div className="grow px-2">
                    <InputBox hideOnClick={true} value={search} onChange={e => setSearch(e.target.value)} placeholder='Search books here' />
                </div></div>
            <div className="flex flex-row justify-center w-full h-12 px-20">
                <div className="px-4 sm:px-12 h-full font-medium flex items-center cursor-pointer hover:bg-primary-darker transition-colors">
                    BROWSE
                </div>
                <div className="px-4 sm:px-12  h-full font-medium flex items-center cursor-pointer hover:bg-primary-darker transition-colors">
                    PUBLISHERS
                </div>
                <div className="px-4 sm:px-12  h-full font-medium flex items-center cursor-pointer hover:bg-primary-darker transition-colors">
                    AUTHORS
                </div>
            </div>
        </nav>
    )
}

export default UserNavbar