import { useState } from "react"
import InputBox from "../form/InputBox"
import SelectSearchPopup from "../form/SelectSearchPopup"
import { useSearchParams } from "react-router-dom"
import axiosInstance from "../../lib/axiosInstance";
import useSWR from 'swr'
import { BsXLg } from "react-icons/bs";

const BookTableFilter = ({ onQueryEnter }) => {
    const [param, setParam] = useSearchParams()
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState(null)
    const [startDate, setStartDate] = useState(param.get('start'))
    const [endDate, setEndDate] = useState(param.get('end'))
    const { data, isLoading, error } = useSWR('/categories', url => axiosInstance.get(url).then(res => res.data))

    const submitQuery = e => {
        e.preventDefault()
        const newParams = new URLSearchParams(param.toString())
        newParams.set('q', query)
        setParam(newParams)
    }

    const appendParam = (key, value) => {
        const newParams = new URLSearchParams(param.toString())
        newParams.set(key, value)
        setParam(newParams)
    }

    const clearParam = (key) => {
        const newParams = new URLSearchParams(param.toString())
        newParams.delete(key)
        setParam(newParams)
    }

    const selected = data?.data.filter((item) => item._id == param.get('category'))[0]

    return (
        <div className="p-3 bg-white w-full">
            <div className="flex flex-row flex-wrap mb-2">
                <div className="mb-1 md:mr-1 w-full max-w-96">
                    <SelectSearchPopup
                        label="Category"
                        selected={selected ? [selected?._id] : []}
                        value={category ?
                            <div className="bg-secondary text-white p-0.5 rounded-full flex items-center justify-between text-xs px-2 mr-2 cursor-default shadow-2xl">
                                <span>{category.title}</span>
                                <span className="ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCategory(null); clearParam('category') }}><BsXLg /></span>
                            </div>
                            : '- - -'}
                        data={data?.data}
                        selectItem={(item, index) => (
                            <label htmlFor="hs-radio-on-right" onClick={() => { setCategory(item); appendParam('category', item._id) }} className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 group cursor-pointer">
                                <span className="text-sm text-gray-500 group-hover:text-gray-700">{item.title} ({item.book_count})</span>
                            </label>
                        )} />
                </div>
                <div className="mb-1 md:ml-1 grow flex flex-col">
                    <label className='mb-1' htmlFor="">Publication Date</label>
                    <div className="flex flex-row items-center">
                        <InputBox value={startDate} onChange={e => { setStartDate(e.target.value); appendParam('start', e.target.value) }} className='w-full mr-1' type="date" />
                        <span className="mx-1">-</span>
                        <InputBox value={endDate} onChange={e => { setEndDate(e.target.value); appendParam('end', e.target.value) }} className='w-full ml-1' type="date" />
                    </div>
                </div>
            </div>
            <form onSubmit={submitQuery}>
                <InputBox value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" hideOnClick={true} />
            </form>
        </div>
    )
}

export default BookTableFilter