# Feinbnb

## Key Functionality Features:

- Sign up or login to leave reviews of listings, or to create your very own listing!
- Create, Update, View, and Delete a spot for others to stay in
- Create, Delete, and View a review of other user's listings

## About this project

Feinbnb is a full-stack application cloning Aribnb. This project utilizies the following technologies: HTML, CSS, JS (React, Redux, Express, Sequelize), and SQL.

![example-picture]

[example-picture]: readme-example.png

## Technologies Used

### Back-end

- JavaScript
- Node.js
- React
- Redux

### Front-end:

- Express
- PostgressSQL
- Sequelize

### Deployment:

- Heroku

## Instructions

1. Clone this repo,
2. cd into the backend server and install dependencies

```
cd backend
npm install
```

3. Create a .env file at the root of the backend directory and set values for PORT, DB_FILE, JWT_SECRET, and JWT_EXPIRES_IN

4. Migrate and seed existing data in the root of the backend folder

```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

5. Start the backend server, then cd into the root folder

```
npm start
cd ..
```

6. cd into the front end folder from the root directory and install dependencies

```
cd frontend
npm install
```

7. Open a new terminal and start the frontend server

```
npm start
```
