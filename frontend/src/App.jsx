import { RouterProvider } from "react-router-dom"
import WebRouter from "./routes/WebRouter"
import { ModalProvider } from "./contexts/ModalContext"

const App = () => {
    return (
        <ModalProvider>
            <RouterProvider router={WebRouter} />
        </ModalProvider>
    )
}

export default App
