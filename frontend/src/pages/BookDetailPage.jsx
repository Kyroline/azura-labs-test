const bookData = {
    title: 'Celestia',
    author: 'D\'Cherries',
    publisher: 'Gramedia Pustaka Utama',
    image: '/uploads/celestia.jpg'
}

const BookDetailPage = () => {
    return (
        <main className="mt-28 px-2 md:px-12 py-10">
            <section className="flex flex-row">
                <div className=""></div>
                <img src={bookData.image} alt="" className="mr-2" />
                <div className="ml-2 grow">
                    <div className="mb-4">
                        <h1 className="text-primary font-bold text-3xl mb-2">{bookData.title.toUpperCase()}</h1>
                        <h1 className="text-secondary font-medium text-xl mb-2">By {bookData.author}</h1>
                        <div className="mb-2">
                            <span className="text-2xl mb-2 text-primary">⭐⭐⭐⭐⭐ <span className="text-xl">3 Reviews</span></span>
                        </div>
                        <div className="mb-2">
                        <span className="p-2 px-4 text-white bg-red-600 rounded-full mr-2">Author's Choice</span>
                        <span className="p-2 px-4 text-white bg-blue-600 rounded-full mr-2">Best Seller 2024</span>
                        <span className="p-2 px-4 text-black bg-yellow-400 rounded-full">August Trending</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="w-full border-b border-primary">
                            <h1 className="font-bold text-xl text-primary">Bibliographic</h1>
                        </div>
                        <p className="text-primary">Languange: Indonesian</p>
                        <p className="text-primary">Number Of Pages: 109</p>
                        <p className="text-primary">Published: 8 August 2024</p>
                        <p className="text-primary">Languange: English</p>
                    </div>

                    <div className="mb-4">
                        <div className="w-full border-b border-primary">
                            <h1 className="font-bold text-xl text-primary">Description</h1>
                        </div>
                        <p className="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida orci eu leo blandit luctus. Etiam molestie odio tortor, quis placerat nunc laoreet vitae. Nullam at tempus sem, vel tristique ex. Proin dapibus, lacus a malesuada fermentum, risus sapien tempor nunc, consectetur consectetur augue enim eu quam. Quisque blandit libero non ultrices ullamcorper. Donec euismod, eros vitae pharetra volutpat, quam lectus tempor est, accumsan lobortis purus tellus non tortor. Vivamus ultrices risus placerat turpis scelerisque ultricies. Aenean in iaculis tortor. Quisque a nunc nisl. Cras non varius sapien, vitae facilisis augue. Nulla facilisi. Cras suscipit cursus enim, eget dapibus odio tincidunt vel. In hac habitasse platea dictumst.
                            Aenean tempor nisl a massa venenatis, ut tristique nunc sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In cursus aliquet diam, vel rhoncus risus accumsan a. Nam ut ex faucibus, varius elit nec, faucibus purus. Maecenas a elit id felis egestas faucibus. Fusce id arcu eu turpis pharetra sollicitudin quis ac massa. Aliquam bibendum faucibus nunc, vitae lacinia dui pulvinar ut. Pellentesque ut metus sit amet odio laoreet placerat. Nullam ut erat quis erat eleifend porta vitae vel lorem. Etiam consequat lectus ut condimentum mattis. Nam venenatis massa vitae diam iaculis consequat. Nunc justo eros, facilisis in libero eu, auctor auctor risus. Etiam et blandit nulla.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default BookDetailPage