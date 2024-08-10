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
https://drive.usercontent.google.com/download?id=1wMgCWAsqlw0nXcMhCldTbwSznMdXUmBT
 - Create/Update/Delete Book Categories (accessible in '/categories')
![Screenshot of category creation](https://drive.usercontent.google.com/download?id=1Hjho6G1k2_e1t8YBB8uUUlG680nyXV26)
![Screenshot of category update](https://drive.usercontent.google.com/download?id=1G-96_1O_viS74NDMllNAbImlPCU7TGw9)
![Screenshot of category deletion](https://drive.usercontent.google.com/download?id=1nl_7vsc-ccaHXg1YCxeJJohV9TdmF3fr)
 - Create/Update/Delete Books (accessible in '/books/new', '/books/:id', and '/books')
![Screenshot of book creation](https://drive.usercontent.google.com/download?id=1jZtKbW5hdXEEhdCNBePoVVTYDWyTXQiM)
![Screenshot of book update](https://drive.usercontent.google.com/download?id=1zjRK30N8MggKoAz65Hv-rsL9sjMQvKnp)
![Screenshot of book deletion](https://drive.usercontent.google.com/download?id=13yxgTAzCSegmI4NKQMg4A1Eq0CVLLYZ-)
 - View List Book Categories (accessible in '/admin/categories')
![Screenshot of category list](https://drive.usercontent.google.com/download?id=1SH_aciMyUPKHXzIVzoyf2HrV9dIkgjmV)
 - View List Books (accessible in '/books')
![Screenshot of book list](https://drive.usercontent.google.com/download?id=1VE9zODP_pPyG6JOyPzfQCp5HSjHICLeY)
 - Filter List Books by Categories (accessible by the select box in '/books')
 - Filter List Books by text that will search for Title, Author and Publisher (accessible by the search box in '/books')
 - Filter List Books by Publication Date (accessible by the twin date input in '/books')
![Screenshot of book list (admin)](https://drive.usercontent.google.com/download?id=1jecep_mmFepOkOY7juU1Na5UdVnADXRK)