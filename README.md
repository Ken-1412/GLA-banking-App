# GlaBank - Modern Banking Application

![GlaBank Landing Page](docs/images/landing-page.png)

GlaBank is a next-generation banking platform designed to provide a seamless, secure, and visually stunning financial experience. Built with modern web technologies, it features a 3D interactive landing page, a comprehensive dashboard for tracking finances, and robust security settings.

## 🚀 Features

-   **Immersive Landing Page**: Features a 3D card carousel and parallax effects for a premium first impression.
-   **Comprehensive Dashboard**:
    -   **Analytics**: Visualize spending, income, and savings with interactive charts.
    -   **Transaction History**: View and filter transactions.
    -   **Export & Reports**: Download transaction data as CSV or generate printable PDF reports.
-   **Secure Authentication**:
    -   User registration and login with secure password validation.
    -   Premium dark-themed authentication pages.
-   **User Settings**:
    -   Profile management (Name, Email, Phone).
    -   Security settings (Password update).
    -   Notification preferences.
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS, CSS Modules
-   **Backend**: Node.js, Express
-   **Database**: MongoDB (Local & Atlas support)
-   **UI Components**: Radix UI, Lucide React, Recharts
-   **Animations**: Framer Motion, React Spring

## 📸 Screenshots

### Login Page
![Login Page](docs/images/login-page.png)

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

-   **Node.js** (v18 or higher)
-   **MongoDB** (Local instance or Atlas connection string)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/glabank.git
    cd glabank
    ```

2.  **Install Dependencies**
    ```bash
    # Install root dependencies
    npm install

    # Install server dependencies
    cd server
    npm install
    cd ..
    ```

### Environment Setup

1.  **Backend Configuration**
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/glabank
    JWT_SECRET=your_jwt_secret_key
    ```

2.  **Frontend Configuration**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

### Running the Application

1.  **Start the Backend**
    Open a terminal and run:
    ```bash
    cd server
    npm run dev
    ```
    *This will start the Express server on port 5000 and connect to MongoDB.*

2.  **Start the Frontend**
    Open a second terminal and run:
    ```bash
    npm run dev
    ```
    *This will start the Vite development server on port 5173.*

3.  **Access the App**
    Open your browser and visit [http://localhost:5173](http://localhost:5173).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
