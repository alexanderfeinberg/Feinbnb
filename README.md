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

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### Front-end:

- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
- ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Deployment:

- ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

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
