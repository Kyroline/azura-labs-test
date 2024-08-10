import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../form/Button"
import moment from 'moment'
import { IoPencil, IoTrash } from "react-icons/io5"
import useModal from '../../hooks/useModal'
import ConfirmBookDeletion from "../modals/ConfirmBookDeletion"

const columns = [
    {
        title: 'Cover'
    },
    {
        title: 'Title'
    },
    {
        title: 'Author'
    },
    {
        title: 'Categories'
    },
    {
        title: 'Publisher'
    },
    {
        title: 'Publication Date'
    },
    {
        title: ''
    }
]

const BookTable = ({ data }) => {
    const { showModal, hideModal, modal } = useModal()
    const navigate = useNavigate()
    return (
        <table className="text-xs text-left text-black w-full">
            <thead className="text-xs text-white uppercase bg-primary">
                {columns?.map((item, index) => (
                    <th key={index} scope="col" className="px-4 py-3">{item.title}</th>
                ))}
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr className="bg-white border-b">
                        <td className="px-4 py-3">
                            <img className="max-w-20" src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/${item.cover}`} alt="" />
                        </td>
                        <td className="px-4 py-3">{item.title}</td>
                        <td className="px-4 py-3">{item.author}</td>
                        <td className="px-4 py-3 break-words">{item.categories.map((category) => `${category.title},`)}</td>
                        <td className="px-4 py-3">{item.publisher}</td>
                        <td className="px-4 py-3">{moment(item.publication_date).format('DD MMMM YYYY')}</td>
                        <td className="px-4 py-3">
                            <div className="flex flex-col items-center justify-center">
                                <Button
                                    title={<IoPencil />}
                                    onClick={() => navigate(`/admin/books/${item._id}`)}
                                    size="md"
                                    style="custom"
                                    className="rounded-md mb-2 bg-yellow-400 hover:bg-yellow-600"
                                />
                                <Button
                                    title={<IoTrash />}
                                    onClick={() => {showModal(<ConfirmBookDeletion key={Date.now()} bookId={item._id} />)}}
                                    size="md"
                                    style="custom"
                                    className="rounded-md mb-2 bg-red-600 hover:bg-red-800"
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BookTable