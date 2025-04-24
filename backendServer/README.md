# WeeTechElearning

WeeTechElearning is a full-stack e-learning platform built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It provides interactive courses and hands-on training in various tech fields, including AI, web development, and cybersecurity.

## Features
- User authentication (JWT-based login/signup)
- Course management (add, update, delete, and enroll in courses)
- Video lectures, quizzes, and progress tracking
- Admin dashboard for managing users and courses
- Secure REST API with Express.js
- Responsive and user-friendly UI with React

## Tech Stack
- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, bcrypt
- **Database:** MongoDB & Mongoose

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository
```sh
git clone https://github.com/your-username/WeeTechElearning.git
cd WeeTechElearning
```

### Backend Setup
```sh
cd server
npm install
npm start
```

### Frontend Setup
```sh
cd client
npm install
npm start
```

## Environment Variables
Create a `.env` file in the `server` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Usage
- Open `http://localhost:3000` to access the frontend.
- The backend runs on `http://localhost:5000`.

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## License
This project is licensed under the MIT License.
