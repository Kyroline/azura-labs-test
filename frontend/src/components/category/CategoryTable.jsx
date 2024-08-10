import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../form/Button"
import moment from 'moment'
import { IoPencil, IoTrash } from "react-icons/io5"
import useModal from '../../hooks/useModal'
import ConfirmBookDeletion from "../modals/ConfirmBookDeletion"
import EditBookCategory from "../modals/EditBookCategory"

const columns = [
    {
        title: 'Title'
    },
    {
        title: 'Book Count(s)'
    },
    {
        title: 'Creation Date'
    },
    {
        title: 'Last Modified'
    },
    {
        title: ''
    }
]

const CategoryTable = ({ data }) => {
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
                        <td className="px-4 py-3">{item.title}</td>
                        <td className="px-4 py-3">{item.book_count}</td>
                        <td className="px-4 py-3">{moment(item.created_at).format('DD MMMM YYYY')}</td>
                        <td className="px-4 py-3">{moment(item.updated_at).format('DD MMMM YYYY')}</td>
                        <td className="px-4 py-3">
                            <div className="flex flex-row items-center justify-center">
                                <Button
                                    title={<IoPencil />}
                                    onClick={() => showModal(<EditBookCategory categoryId={item._id} />)}
                                    size="md"
                                    style="custom"
                                    className="rounded-md mr-1 bg-yellow-400 hover:bg-yellow-600"
                                />
                                <Button
                                    title={<IoTrash />}
                                    onClick={() => { showModal(<ConfirmBookDeletion />) }}
                                    size="md"
                                    style="custom"
                                    className="rounded-md ml-1 bg-red-600 hover:bg-red-800"
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CategoryTable