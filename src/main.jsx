import React from 'react'
import ReactDOM from 'react-dom/client'
import './custom.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import PrivateRoutes from "./components/PrivateRoutes.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import MyReadings from "./pages/MyReadings.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BookForm from "./pages/BookForm.jsx";
import ReadingsForm from "./pages/ReadingsForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import DisplayPage from "./pages/DisplayPage.jsx";
import ToReadPage from "./pages/ToReadPage.jsx";
import UserVerificationPage from "./pages/UserVerificationPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import RecoverPasswordPage from "./pages/RecoverPasswordPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/books',
                element: <MyBooks />,
            },
            {
                path: '/book',
                element: <BookForm />,
            },
            {
                path: '/book/:id',
                element: <BookForm />,
                // errorElement: <NotFound />
            },
            {
                path: '/readings',
                element: <MyReadings />,
            },
            {
                path: '/to_read',
                element: <ToReadPage />,
            },
            {
                path: '/reading-form',
                element: <ReadingsForm />,
            },
            {
                path: '/reading-form/:id',
                element: <ReadingsForm />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegistrationPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/recover-password/:token',
        element: <RecoverPasswordPage />,
    },
    {
        path: '/user/verify/:token',
        element: <UserVerificationPage />,
    },
    {
        path: '/display/:username',
        element: <DisplayPage />,
    },
    {
        path: '/404',
        element: <NotFound />,
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
)
