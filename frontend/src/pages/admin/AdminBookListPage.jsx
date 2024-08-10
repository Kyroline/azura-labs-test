import BookTable from "../../components/book/BookTable"
import BookTableFilter from "../../components/book/BookTableFilter"
import useSWR from 'swr'
import axiosInstance from "../../lib/axiosInstance"
import { useNavigate, useSearchParams } from "react-router-dom"
import Breadcrumbs from '../../components/Breadcrumbs'
import Button from "../../components/form/Button"
import { IoIosAdd } from "react-icons/io";

const AdminBookListPage = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useSearchParams()
    const { data, isLoading, error } = useSWR(`/books?category=${query.get('category') ?? ''}&start=${query.get('start') ?? ''}&end=${query.get('end') ?? ''}&q=${query.get('q') ?? ''}`, url => axiosInstance.get(url).then(res => res.data))
    return (
        <>
            <div className="flex flex-row justify-between">
                <Breadcrumbs nodes={[
                    {
                        title: 'Home',
                        link: '/admin'
                    },
                    {
                        title: 'Books'
                    }
                ]} />
                <Button onClick={() => navigate('/admin/books/new')} buttonSize="md" className="rounded-md">
                    <div className="flex flex-row items-center">
                        <IoIosAdd className="mr-1 text-xl" />
                        New Book
                    </div>
                </Button>
            </div>
            <div className="flex flex-col mt-2">
                <BookTableFilter />
                <div className="w-full overflow-x-auto">
                    <BookTable data={data?.data} />
                </div>
            </div>
        </>
    )
}

export default AdminBookListPage