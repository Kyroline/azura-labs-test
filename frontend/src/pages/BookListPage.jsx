import { useEffect, useRef, useState } from "react"
import InputBox from "../components/form/InputBox"
import BookGrid from "../components/book/BookGrid"
import useBreakpoint from "../hooks/useBreakpoint"
import Button from "../components/form/Button"
import SelectSearch from "../components/form/SelectSearch"

const bookData = [
    {
        _id: 'aaaa',
        title: 'Celestia',
        author: 'D\'Cherries',
        publisher: 'Gramedia Pustaka Utama',
        image: '/uploads/celestia.jpg'
    },
    {
        _id: 'aaaa',
        title: 'The Antagonist',
        author: 'D\'Cherries',
        publisher: 'Gramedia Pustaka Utama',
        image: '/uploads/the_antagonist.jpg'
    }
]
const data = ['Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep', 'Mep']

const BookListPage = () => {
    const [stick, setStick] = useState(0)
    const video = useRef()
    const { sm, md } = useBreakpoint()

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

    useEffect(() => {

        window.addEventListener("scroll", handleMobileVideoScroll)

        return () => {
            window.removeEventListener("scroll", handleMobileVideoScroll)
        }
    }, [])

    return (
        <main className="mt-28 px-2 md:px-12 py-10">
            <div className="text-primary font-ubuntu font-medium text-sm mb-4">HOME &gt; BOOKS &gt; FICTION</div>
            <div className="flex flex-row">
                {md ?
                    <div ref={video} className="w-80 grow shrink-0 sm:mr-2 relative">
                        <div className={` h-[calc(100vh-160px)] no-scrollbar overflow-y-auto flex flex-col p-8 w-80 rounded-md border text-primary border-secondary ${stick == 1 ? 'fixed top-[144px]' : stick == 2 ? 'absolute bottom-0' : ''}`}>
                            <h1 className="text-2xl font-bold">FILTER</h1>
                            <div className="w-full">
                                <SelectSearch label="Category"
                                    data={data}
                                    selectItem={(item, index) => (
                                        <label htmlFor="hs-radio-on-right" className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                                            <span className="text-sm text-gray-500 dark:text-neutral-400">{item}</span>
                                            {/* <input type="radio" name="hs-radio-on-right" className="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-radio-on-right" /> */}
                                        </label>
                                    )} />
                            </div>
                            <div className="w-full">
                                <SelectSearch label="Author"
                                    data={data}
                                    selectItem={(item, index) => (
                                        <label htmlFor="hs-radio-on-right" className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                                            <span className="text-sm text-gray-500 dark:text-neutral-400">{item}</span>
                                            {/* <input type="radio" name="hs-radio-on-right" className="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-radio-on-right" /> */}
                                        </label>
                                    )} />
                            </div>
                            <div className="w-full">
                                <SelectSearch label="Publisher"
                                    data={data}
                                    selectItem={(item, index) => (
                                        <label htmlFor="hs-radio-on-right" className="flex p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                                            <span className="text-sm text-gray-500 dark:text-neutral-400">{item}</span>
                                            {/* <input type="radio" name="hs-radio-on-right" className="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-radio-on-right" /> */}
                                        </label>
                                    )} />
                            </div>
                            <div className="w-full">
                                <div className="mb-1 grow flex flex-col">
                                    <label className='mb-1' htmlFor="">Publication Date</label>
                                    <div className="flex flex-col items-center">
                                        <InputBox className='w-full mb-1' type="date" />
                                        <InputBox className='w-full mb-1' type="date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
                <div className={`font-medium w-full flex flex-col`} >
                    <h1 className="text-center md:text-left md:ml-2 font-bold text-primary text-3xl mb-4">FICTION BOOKS</h1>
                    {!md ?
                        <div className="grid grid-cols-2 gap-2 mb-2 h-10">
                            <Button title='FILTER' style="tertiary" size="md" />
                            <Button title='SORT' style="tertiary" size="md" />
                        </div>
                        : null}
                    {/* <p className="md:ml-2 font-medium text-primary mb-4">FICTION BOOKS</p> */}
                    <div className="grid gap-2 grid-cols-2 xl:grid-cols-3">
                        {bookData.map((book, index) => <BookGrid key={index} data={book} />)}
                        {bookData.map((book, index) => <BookGrid key={index} data={book} />)}
                        {bookData.map((book, index) => <BookGrid key={index} data={book} />)}
                        {bookData.map((book, index) => <BookGrid key={index} data={book} />)}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BookListPage