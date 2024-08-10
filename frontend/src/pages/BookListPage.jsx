import { useEffect, useRef, useState } from "react"
import InputBox from "../components/form/InputBox"
import BookGrid from "../components/book/BookGrid"
import useBreakpoint from "../hooks/useBreakpoint"
import Button from "../components/form/Button"
import SelectSearch from "../components/form/SelectSearch"
import useSWR from "swr"
import axiosInstance from "../lib/axiosInstance"
import { useSearchParams } from "react-router-dom"
import { BsXLg } from "react-icons/bs"
import Breadcrumbs from "../components/Breadcrumbs"

const data = ['Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep']

const BookListPage = () => {
    const [param, setParam] = useSearchParams()
    const [stick, setStick] = useState(0)
    const [startDate, setStartDate] = useState(param.get('start'))
    const [endDate, setEndDate] = useState(param.get('end'))
    const [query, setQuery] = useState('')
    const video = useRef()
    const { sm, md } = useBreakpoint()
    const { data: categoryData } = useSWR(`/categories`, url => axiosInstance.get(url).then(res => res.data))
    const { data: bookData, isLoading, error } = useSWR(`/books?category=${param.get('category') ?? ''}&start=${param.get('start') ?? ''}&end=${param.get('end') ?? ''}&q=${param.get('q') ?? ''}`, url => axiosInstance.get(url).then(res => res.data))

    const selected = categoryData?.data.filter((item) => item._id == param.get('category'))[0]
    const [category, setCategory] = useState(selected)
    const handleMobileVideoScroll = () => {
        if (video.current) {
            const rect = video.current.getBoundingClientRect()
            if (window.innerHeight - rect.bottom > 14)
                setStick(2)
            else if (rect.top < 144)
                setStick(1)
            else
                setStick(0)
        }
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

    const submitQuery = e => {
        e.preventDefault()
        const newParams = new URLSearchParams(param.toString())
        newParams.set('q', query)
        setParam(newParams)
    }

    useEffect(() => {

        window.addEventListener("scroll", handleMobileVideoScroll)

        return () => {
            window.removeEventListener("scroll", handleMobileVideoScroll)
        }
    }, [])

    console.log(selected)
    return (
        <main className="mt-28 px-2 md:px-12 py-10">
            <div className="text-primary font-ubuntu font-medium text-sm mb-4">
                <Breadcrumbs nodes={[
                    {
                        title: 'Home',
                        link: '/'
                    },
                    {
                        title: 'Books'
                    }
                ]} />
            </div>
            <div className="flex flex-row">
                {md ?
                    <div ref={video} className="w-80 grow shrink-0 sm:mr-2 relative">
                        <div className={` h-[calc(100vh-160px)] no-scrollbar overflow-y-auto flex flex-col p-8 w-80 rounded-md border text-primary border-secondary ${stick == 1 ? 'fixed top-[144px]' : stick == 2 ? 'absolute bottom-0' : ''}`}>
                            <h1 className="text-2xl font-bold">FILTER</h1>
                            <div className="w-full">
                                <SelectSearch
                                    label="Category"
                                    selected={selected ? [selected?._id] : []}
                                    value={selected ?
                                        <div className="bg-secondary text-white p-0.5 rounded-full flex items-center justify-between text-xs px-2 mr-2 cursor-default shadow-2xl">
                                            <span>{selected.title}</span>
                                            <span className="ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCategory(null); clearParam('category') }}><BsXLg /></span>
                                        </div>
                                        : '- - -'}
                                    data={categoryData?.data}
                                    selectItem={(item, index) => (
                                        <label htmlFor="hs-radio-on-right" onClick={() => { setCategory(item); appendParam('category', item._id) }} className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 group cursor-pointer">
                                            <span className="text-sm text-gray-500 group-hover:text-gray-700">{item.title} ({item.book_count})</span>
                                        </label>
                                    )} />
                            </div>
                            <div className="w-full">
                                <div className="mb-1 grow flex flex-col">
                                    <label className='mb-1' htmlFor="">Publication Date</label>
                                    <div className="flex flex-col items-center">
                                        <span className="w-full text-left mb-1">From</span>
                                        <InputBox value={startDate} onChange={e => { setStartDate(e.target.value); appendParam('start', e.target.value) }} className='w-full mr-1' type="date" />
                                        <span className="w-full text-left mb-1">To</span>
                                        <InputBox value={endDate} onChange={e => { setEndDate(e.target.value); appendParam('end', e.target.value) }} className='w-full ml-1' type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <form onSubmit={submitQuery}>
                                    <label className='mb-2 text-primary'>Search</label>
                                    <InputBox value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" hideOnClick={true} />
                                </form></div>
                        </div>
                    </div>
                    : null}
                <div className={`font-medium min-h-screen w-full flex flex-col`} >
                    <h1 className="text-center md:text-left md:ml-2 font-bold text-primary text-3xl mb-4">BOOK LISTS</h1>
                    {!md ?
                        <div className="grid grid-cols-2 gap-2 mb-2 h-10">
                            <Button buttonStyle="tertiary" buttonSize="md">FILTER</Button>
                            <Button buttonStyle="tertiary" buttonSize="md">SORT</Button>
                        </div>
                        : null}
                    {/* <p className="md:ml-2 font-medium text-primary mb-4">FICTION BOOKS</p> */}
                    <div className="grid gap-2 grid-cols-2 xl:grid-cols-3">
                        {bookData?.data.map((book, index) => <BookGrid key={index} data={book} />)}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BookListPage