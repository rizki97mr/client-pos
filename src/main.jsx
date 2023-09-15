import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import ErrorPage from './pages/404'
import ProductsPage from './pages/products'
import ListProductPage from './pages/listProducts'
import ReportPage from './pages/report'
import ListAddress from './pages/listAddress'
import ListTag from './pages/listTag'
import ListCategory from './pages/listCategory'
import DetailProduct from './pages/detailProduct'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/",
    element: <ProductsPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/product/:id",
    element: <DetailProduct /> ,
  },
  {
    path: "/listproducts",
    element: <ListProductPage />
  },
  {
    path: "/listaddress",
    element: <ListAddress />
  },
  {
    path: "/listtag",
    element: <ListTag />
  },
  {
    path: "/listcategory",
    element: <ListCategory />
  },
  {
    path: "/report",
    element: <ReportPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
