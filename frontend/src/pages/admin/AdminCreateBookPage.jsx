import { useState } from "react"
import { IoMdSave } from "react-icons/io";
import InputBox from "../../components/form/InputBox"
import Button from "../../components/form/Button"
import Breadcrumbs from "../../components/Breadcrumbs"
import axiosInstance from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/form/ImageUpload";
import SelectSearchPopup from "../../components/form/SelectSearchPopup";
import useSWR from 'swr'
import { BsXLg } from "react-icons/bs";
import AutoCorrectInput from "../../components/form/AutoCorrectInput";

const AdminCreateBookPage = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [date, setDate] = useState(null)
    const [category, setCategory] = useState([])
    const [numPages, setNumPages] = useState(0)

    const [loading, setLoading] = useState(false)
    const [cover, setCover] = useState(null)
    const navigate = useNavigate()

    const { data, isLoading, error } = useSWR('/categories', url => axiosInstance.get(url).then(res => res.data))
    const { data: authorData } = useSWR('/books/fields?field=author', url => axiosInstance.get(url).then(res => res.data))
    const { data: publisherData } = useSWR('/books/fields?field=publisher', url => axiosInstance.get(url).then(res => res.data))

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('/books', {
                title,
                author,
                publication_date: date,
                publisher,
                num_pages: numPages,
                categories: category.map(item => item.id),
                cover
            }).data
            navigate('/admin/books')
        } catch (error) {

        }
        setLoading(false)
    }

    return (
        <>

            <form onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between mb-2">
                        <Breadcrumbs nodes={[
                            {
                                title: 'Home',
                                link: '/admin'
                            },
                            {
                                title: 'Books',
                                link: '/admin/books'
                            },
                            {
                                title: 'New Book'
                            }
                        ]} />
                    </div>
                    <div className="p-2 w-full bg-white shadow-md flex flex-col">
                        <div className="flex flex-col lg:flex-row">
                            <div className="flex flex-col grow lg:mr-2">
                                <div className="py-2 border-b mb-2">
                                    <h1 className="font-medium text-xl text-primary">Book Detail</h1>
                                </div>
                                <InputBox
                                    className="mb-2"
                                    required={true}
                                    label="Title"
                                    value={title}
                                    onChange={e => setTitle(e.target ? e.target.value : e)}
                                    placeholder="Title" />
                                <AutoCorrectInput
                                    data={authorData?.data}
                                    className="mb-2"
                                    required={true}
                                    label="Author's Name"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    onSelectClick={value => setAuthor(value)}
                                    placeholder="Author's Name" />
                                <AutoCorrectInput
                                    data={publisherData?.data}
                                    className="mb-2"
                                    required={true}
                                    label="Publisher"
                                    value={publisher}
                                    onChange={e => setPublisher(e.target.value)}
                                    onSelectClick={value => setPublisher(value)}
                                    placeholder="Publisher" />
                                <div className="flex flex-row mb-2">
                                    <div className="w-full mr-2">
                                        <InputBox
                                            className=""
                                            required={true}
                                            label="Publication Date"
                                            type="date"
                                            value={date}
                                            onChange={e => setDate(e.target.value)} />
                                    </div>
                                    <div className="w-full ml-2">
                                        <InputBox
                                            className=""
                                            required={true}
                                            label="Number of Page(s)"
                                            type="number"
                                            value={numPages}
                                            onChange={e => setNumPages(e.target.value)} />
                                    </div>
                                </div>
                                <div className="">
                                    <input type="hidden" name="" required={category.length == 0} />
                                    <SelectSearchPopup
                                        value={
                                            category.length == 0 ? '- - -' :
                                                category.map((item, index) => (
                                                    <div className="bg-secondary text-white p-0.5 rounded-full flex items-center justify-between text-xs px-2 mr-2 cursor-default shadow-2xl">
                                                        <span>{item.title}</span>
                                                        <span className="ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCategory(prev => prev.filter((item, index1) => index1 != index)) }}><BsXLg /></span>
                                                    </div>
                                                ))
                                        }
                                        selected={category.map(item => item.id)}
                                        labelClass="ml-2 text-primary"
                                        required={true}
                                        label="Category"
                                        data={data?.data}
                                        selectItem={(item, index) => (
                                            <label onClick={() => { setCategory(prev => [...prev, { id: item._id, title: item.title }]) }} htmlFor="hs-radio-on-right" className="cursor-pointer flex group p-3 w-full bg-white text-sm focus:border-blue-500 focus:ring-blue-500 ">
                                                <span className="text-sm text-gray-500 group-hover:text-gray-700">{item.title} ({item.book_count})</span>
                                                {/* <input type="radio" name="hs-radio-on-right" className="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-radio-on-right" /> */}
                                            </label>
                                        )} />
                                </div>
                            </div>
                            <div className="lg:max-w-[50%] lg:ml-2">
                                <div className="py-2 border-b mb-2">
                                    <h1 className="font-medium text-xl text-primary">Book Cover</h1>
                                </div>
                                <ImageUpload onUploadEnd={() => setLoading(false)} onUploadStart={() => setLoading(true)}
                                    onUploadSuccess={(image) => { console.log(image); setCover(image) }} aspectClass='aspect-[5/5]' image={cover ? `/uploads/tmp/${cover}` : null} />
                            </div>
                        </div>
                        <div className="p-2 border-t h-fit">
                            <Button
                                className="p-2"
                                style="primary"
                                disabled={loading}
                                size="md"
                                title={
                                    <div className="flex flex-row items-center h-full">
                                        {loading ?
                                            <svg aria-hidden="true" class="mr-1 w-5 h-5 text-gray-200 animate-spin fill-tertiary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            :
                                            <IoMdSave className="mr-1 text-xl" />
                                        }
                                        <span>Create</span>
                                    </div>
                                } />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AdminCreateBookPage