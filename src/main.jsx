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
import { Provider } from "react-redux"
import store from "./redux/store"
import CartPage from './pages/cartPage'
import Invoice from './pages/invoice'
import EditProduct from './components/Fragments/EditProduct'
import EditAddres from './components/Fragments/EditAddres'


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
    path: "/dataproducts",
    element: <ListProductPage />
  },
  {
    path: "/dataaddress",
    element: <ListAddress />
  },
  {
    path: "/datatag",
    element: <ListTag />
  },
  {
    path: "/datacategory",
    element: <ListCategory />
  },
  {
    path: "/report",
    element: <ReportPage />
  },
  {
    path: "/cart",
    element: <CartPage />
  },
  {
    path: "/invoice/:id",
    element: <Invoice />
  },
  {
    path: "/dataproducts/edit/:id",
    element: <EditProduct />
  },
  {
    path: "/dataaddress/edit/:id",
    element: <EditAddres />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,

)
