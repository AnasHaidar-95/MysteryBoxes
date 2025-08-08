# MysteryBoxes

MysteryBoxes is a full-stack e-commerce application with a React frontend and a Node.js backend. The application allows users to register, login, browse products, and view their orders. Administrators can add new products to the store.

## Features

### Frontend

*   **User Authentication:** Users can register and log in to their accounts.
*   **Product Browsing:** All users can view a list of all available products.
*   **Shopping Cart:** (Implementation inferred from frontend structure) Users can add products to their cart.
*   **Order Tracking:** Users can view the status of their deliveries.
*   **Admin Dashboard:** Administrators have access to a dashboard where they can manage products.
*   **Real-time Updates:** The application uses WebSockets to provide real-time updates on delivery statuses.

### Backend

*   **User Management:** The backend handles user registration and login, using JWT for authentication.
*   **Product Management:** The backend provides endpoints for creating and retrieving products.
*   **Delivery Tracking:** The backend provides endpoints for updating and retrieving delivery information.
*   **WebSocket Server:** The backend includes a WebSocket server to push real-time updates to clients.

## Technologies Used

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For handling routing within the application.
*   **Axios:** For making HTTP requests to the backend.
*   **Tailwind CSS:** A utility-first CSS framework for styling.
*   **Recharts:** A charting library for React.
*   **Vite:** A fast build tool for modern web projects.

### Backend

*   **Node.js:** A JavaScript runtime for building server-side applications.
*   **Express:** A web framework for Node.js.
*   **MongoDB:** A NoSQL database for storing data.
*   **Mongoose:** An ODM for MongoDB.
*   **JWT:** For generating and verifying JSON Web Tokens.
*   **bcryptjs:** For hashing passwords.
*   **ws:** A WebSocket library for Node.js.

## API Endpoints

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in an existing user.

### Products

*   `GET /api/products/showAllProducts`: Get a list of all products.
*   `POST /api/products/addNewProduct`: Add a new product (admin only).

### Deliveries

*   `GET /api/delivery/user/:userId`: Get all deliveries for a specific user.
*   `PUT /api/delivery/update-status/:id`: Update the status of a delivery.

## Getting Started

### Prerequisites

*   Node.js and npm installed.
*   MongoDB installed and running.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AnasHaidar-95/MysteryBoxes.git
    ```
2.  **Install backend dependencies:**
    ```bash
    cd Backend
    npm install
    ```
3.  **Install frontend dependencies:**
    ```bash
    cd ../Frontend
    npm install
    ```
4.  **Create a `.env` file in the `Backend` directory and add the following:**
    ```
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd Backend
    npm start
    ```
2.  **Start the frontend development server:**
    ```bash
    cd ../Frontend
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
