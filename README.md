## Installation
 - Copy and rename .env.example to .env in backend folder, fill MONGODB_CONNECTION_STRING with your mongodb connection string
 - Copy and rename .env.example to .env.local in frontend folder, fill VITE_API_ENDPOINT with the backend application's host (default: 'localhost:3000')
 - Run frontend application with
 ```
 cd frontend
 npm i
 npm run dev
 ```
 - Run Backend application with
 ```
 cd frontend
 npm i
 npm run start
 ```

## ABOUT
 - Access book list in '/books' (landing page designer are credited below)
 - Access administator panel in '/admin/...' 
 - Anything that's not credited is made by me.

## Credits

 - Special thanks to [Chinara Aliyeva](https://www.behance.net/chinaraaliyeva) for his/her design at [RomanBooks Bookstore Website: UI/UX case study](https://www.behance.net/gallery/202013909/RomanBooks-Bookstore-Website-UIUX-case-study?tracking_source=search_projects|bookstore+website&l=3)

## TASK
Create a website which allows an end user

 - Create/Update/Delete Book Categories (accessible in '/categories')
 - Create/Update/Delete Books (accessible in '/books/new', '/books/:id', and '/books')
 - View List Book Categories (accessible in '/categories')
 - View List Books (accessible in '/books')
 - Filter List Books by Categories (accessible by the select box in '/books')
 - Filter List Books by text that will search for Title, Author and Publisher (accessible by the search box in '/books')
 - Filter List Books by Publication Date (accessible by the twin date input in '/books')