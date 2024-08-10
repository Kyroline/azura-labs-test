import { BsXLg } from "react-icons/bs"
import { FaGoogle } from "react-icons/fa"
import useModal from "../../hooks/useModal"
import Button from '../form/Button'

const ConfirmBookCategoryDeletion = ({ bookId }) => {
    const { showModal, hideModal, modal } = useModal()
    return (
        <div className="flex flex-col bg-white p-2 rounded-xl z-50 md:w-1/3 w-4/5 relative py-4">
            <BsXLg className='absolute right-4 top-4 w-4 h-4 cursor-pointer' onClick={() => hideModal()} />
            <h1 className="text-center font-bold mb-8">WARNING</h1>
            <p>Are you sure you want to delete this data?</p>
            <p className='text-xs text-red-600 font-bold italic'>This action cannot be REVERTED!</p>
            <hr class="h-px bg-gray-200 border-0 mt-2" />
            <div className="flex flex-row w-full justify-end items-center mt-2">
            <Button onClick={() => hideModal()} className="mr-1" style="tertiary" size="md" title='Cancel' />
            <Button style="custom" size="md" className="ml-1 bg-red-600 hover:bg-red-800 text-white" title='Confirm' />
            </div>
        </div>
    )
}

export default ConfirmBookCategoryDeletion