# youtube-clone
YouTube Clone Application
A full-stack YouTube clone developed using the MERN (MongoDB, Express, React, Node.js) stack. This project allows users to view, search, and interact with videos, while also supporting channel creation and user authentication.
Installation
Clone the Repository:
https://github.com/Bansariahir123/youtube-clone
cd youtube-clone
Install dependencies:
et up environment variables:
Create a .env file in the server directory with your MongoDB URI and JWT secret.
Example:
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret

Usage:
Click on SignIn, This will redirect you to the registration form. Enter your username, email, and password to create an account. After registration, use the login form to access your account. Once logged in, "User" will appear in the header which contains the options to either view profile or logout, replacing the "Sign In" button. 
View profile will show the user's profile and inside user's profile "Go to Channel" will redirect you to your channel. Channel will have user's information, videos, edit channel button, upload video button. Note that Edit channel button and upload video button will only appear to your channel (logged in account) for other channel subscribe button will be shown.
Clicking on the thumbnail image of the video will redirect you to the video page, where you can view your video, see information of video, add, delete or modify comments. Update and delete video button will also appear in the video page only if the video is uploaded by you. You can like/dislike the videos.
In the navigation bar, clicking on "Youtube clone" will redirect you to the home page. To search the video, type the title or description on search bar and press the search icon. Category filter will help to filter the videos. 
Data of the changes will be stored in mongodb database.
