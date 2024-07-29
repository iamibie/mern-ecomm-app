## MERN E-commerce Application
This project is a full-featured e-commerce application built with the MERN (MongoDB, Express.js, React, Node.js) stack.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [AWS](#aws)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Product listing, search, and filtering
- Shopping cart functionality
- Order placement and management
- Payment processing
- Admin dashboard for managing products, users, and orders
- Responsive design
  
## Technologies
- Frontend: React.js, Redux, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Payment Gateway: PayPal
- Deployment: Docker, NGINX, AWS EC2
  
## Getting Started
Follow these instructions to set up the project locally.

## Prerequisites
- Node.js
- MongoDB
- Docker
- AWS account (for deployment)
- NGINX

## Installation
1. Clone the repository:

          git clone https://github.com/iamibie/mern-ecomm-app.git
          cd mern-ecomm-app
2. Install backend dependencies:

        cd backend
        npm install

3. Install frontend dependencies:

        cd ../frontend
        npm install
4. Set up environment variables:

Create a .env file in the backend directory and add the following:

    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PAYPAL_CLIENT_ID=your_paypal_client_id
5. Run the application:

        cd ../backend
        npm run dev
The backend server will run on http://localhost:5000 and the frontend on http://localhost:3000.

## Deployment
Docker

To deploy the application using Docker:

1. Build the Docker images:

        docker-compose build
2. Run the Docker containers:

        docker-compose up
The application will be available at http://localhost.

## AWS 
For deployment on AWS EC2, follow these steps:

1. Set up an EC2 instance and SSH into it.

2. Install Docker and Docker Compose:

        sudo apt-get update
        sudo apt-get install docker.io
        sudo apt-get install docker-compose
3. Clone the repository on the EC2 instance and navigate to the project directory.

4. Follow the Docker deployment steps mentioned above.

5. Configure NGINX as a reverse proxy:

Create an NGINX configuration file and set up the proxy for the application.

      server {
          listen 80;
      
          server_name your_domain.com;
      
          location / {
              proxy_pass http://localhost:3000;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
6. Restart NGINX:

        sudo service nginx restart
## Folder Structure
      mern-ecomm-app/
      ├── backend/
      │   ├── config/              # Database configuration
      │   ├── controllers/         # Route controllers for all the endpoints
      │   ├── data/                # Sample data for seeding the database
      │   ├── middleware/          # Custom middleware for authentication and error handling
      │   ├── models/              # Mongoose models
      │   ├── routes/              # API routes
      │   ├── utils/               # Utility functions
      │   ├── .env                 # Environment variables
      │   ├── server.js            # Entry point for the backend
      │   └── package.json         # Backend dependencies and scripts
      ├── frontend/
      │   ├── public/              # Static files
      │   ├── src/
      │   │   ├── actions/         # Redux actions
      │   │   ├── components/      # React components
      │   │   ├── constants/       # Redux constants
      │   │   ├── reducers/        # Redux reducers
      │   │   ├── screens/         # React screens (pages)
      │   │   ├── store.js         # Redux store configuration
      │   │   ├── App.js           # Main React component
      │   │   ├── index.js         # Entry point for the frontend
      │   │   └── ...
      │   ├── .env                 # Environment variables
      │   ├── package.json         # Frontend dependencies and scripts
      │   └── ...
      ├── docker-compose.yml        # Docker Compose file for multi-container setup
      ├── Dockerfile                # Dockerfile for containerizing the application
      ├── nginx.conf                # NGINX configuration for reverse proxy
      ├── README.md                 # Project documentation
      └── ...

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.


