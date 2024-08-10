import { Link, useNavigate } from "react-router-dom"
import Button from "../form/Button"

const BookGrid = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div className="rounded-md border border-secondary md:min-w-24 lg:min-w-48 xl:min-w-64 p-2 flex flex-col xl:flex-row text-primary">
            <img src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/${data?.cover}`} className="max-w-28 aspect-[9/16] object-cover mr-2" alt="" />
            <div className="flex flex-col w-full h-full justify-between">
                <div className="">
                    <h1 className="font-semibold">{data?.title}</h1>
                    <h1 className="text-tertiary text-sm">{data?.author}</h1>
                    <div className="mb-2">
                        <span className="bg-red-600 text-white p-1 rounded-lg text-xs">Author's Choice</span>
                    </div>
                    <div className="text-tertiary text-xs">
                        <p>{data?.categories.map((item) => item.title + ', ')}</p>
                    </div>
                </div>
                <Button onClick={() => navigate(`/books/${data._id}`)} title='View Detail' style="primary" />
            </div>
        </div>
    )
}

export default BookGrid