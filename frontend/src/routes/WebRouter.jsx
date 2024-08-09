import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import BookListPage from "../pages/BookListPage";
import BookDetailPage from "../pages/BookDetailPage";
import AdminBookListPage from "../pages/admin/AdminBookListPage";
import AdminCreateBookPage from "../pages/admin/AdminCreateBookPage";
import AdminCategoryListPage from "../pages/admin/AdminCategoryListPage";
import AdminEditBookPage from "../pages/admin/AdminEditBookPage";

const WebRouter = createBrowserRouter([
    {
        path: '',
        element: <UserLayout />,
        children: [
            {
                path: 'books',
                element: <BookListPage />
            },
            {
                path: 'books/:id',
                element: <BookDetailPage />
            }
        ]
    },
    {
        path: 'admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'books',
                element: <AdminBookListPage />
            },
            {
                path: 'books/new',
                element: <AdminCreateBookPage />
            },
            {
                path: 'books/:id',
                element: <AdminEditBookPage />
            },
            {
                path: 'categories',
                element: <AdminCategoryListPage />
            },
            {
                path: 'categories/new',
                element: <AdminCreateBookPage />
            }
        ]
    }
])

export default WebRouter