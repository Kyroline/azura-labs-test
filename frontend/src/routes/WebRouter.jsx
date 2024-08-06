import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import BookListPage from "../pages/BookListPage";
import BookDetailPage from "../pages/BookDetailPage";

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
        children: []
    }
])

export default WebRouter