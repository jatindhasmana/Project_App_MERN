
# Project_APP_MERN

A Full stack web application which enables to user to create Projects and let other users upload/view files to that project.



## Features

- Authentication & Authorization
- CRUD Operations
- Responsive UI
- Uploading Files
- Creating Projects
- Validations & FeedBacks


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB


## Setup Environment Variables:

- Create a `.env` file in both the `backend` directory.
- Copy the contents of the `.env.example` (given below) file to your `.env` file and fill in your specific values that you will get after creating an account on MongoDB Atlas.
 
   ```bash
   CLOUD_NAME=
   CLOUD_API_KEY=
   CLOUD_API_SECRET=
   ATLASDB_URL=

- For example:
  ```bash
   CLOUD_NAME=my-cloud-name
   CLOUD_API_KEY=my-api-key
   CLOUD_API_SECRET=my-api-secret
   ATLASDB_URL=my-atlasdb-url




## Installation

To get this project up and running locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jatindhasmana/Project_App_MERN.git
   cd Project_App_MERN

2. **Install Dependencies (Backend+Frontend):**
    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install

3.**Run The Application (Frontend+Backend Simultaneously):** 
   ```bash
   npm run dev
   cd ../backend
   node server.js
   ```    

## Demo

- The application is deployed on Render. You can check the live demo :  https://project-mern-0qvt.onrender.com

