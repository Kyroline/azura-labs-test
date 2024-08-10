import BookTable from "../../components/book/BookTable"
import BookTableFilter from "../../components/book/BookTableFilter"
import useSWR from 'swr'
import axiosInstance from "../../lib/axiosInstance"
import { useNavigate, useSearchParams } from "react-router-dom"
import Breadcrumbs from '../../components/Breadcrumbs'
import Button from "../../components/form/Button"
import { IoIosAdd } from "react-icons/io";
import useModal from "../../hooks/useModal"
import CreateBookCategory from "../../components/modals/CreateBookCategory"
import CategoryTable from "../../components/category/CategoryTable"

const AdminCategoryListPage = () => {
    const navigate = useNavigate()
    const { showModal } = useModal()
    const [query, setQuery] = useSearchParams()
    const { data, isLoading, error } = useSWR(`/categories`, url => axiosInstance.get(url).then(res => res.data))
    
    
    return (
        <>
            <div className="flex flex-row justify-between">
                <Breadcrumbs nodes={[
                    {
                        title: 'Home',
                        link: '/admin'
                    },
                    {
                        title: 'Categories'
                    }
                ]} />
                <Button onClick={() => showModal(<CreateBookCategory key={Date.now()} />)} size="md" className="rounded-md" title={
                    <div className="flex flex-row items-center">
                        <IoIosAdd className="mr-1 text-xl" />
                        New Category
                    </div>
                } />
            </div>
            <div className="flex flex-col mt-2">
                <div className="w-full overflow-x-auto">
                    <CategoryTable data={data?.data} />
                </div>
            </div>
        </>
    )
}

export default AdminCategoryListPage