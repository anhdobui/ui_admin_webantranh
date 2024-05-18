import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Product from './pages/Product'
import Category from './pages/Topic'
import User from './pages/User'
import ViewProduct from './pages/Product/ViewProduct'
import FormProduct from './pages/Product/FormProduct'
import ViewCategory from './pages/Topic/ViewCategory'
import { TableProvider } from './contexts/table.context'
import { CategoryProvider } from './contexts/category.context'
import Login from './pages/Login/Login'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import ViewInventory from './pages/BillInventory/ViewInventory'
import FormInventory from './pages/BillInventory/FormBillInventory'
import BillInventory from './pages/BillInventory/BillInventory'
import WareHouse from './pages/WareHouse'
import Orders from './pages/Orders'
import Customer from './pages/Customer'
import FormTopic from './pages/Topic/FormTopic'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          index: true,
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        },
        {
          path: '/product',
          element: (
            <MainLayout>
              <TableProvider>
                <Product />
              </TableProvider>
            </MainLayout>
          ),
          children: [
            {
              path: '',
              index: true,
              element: <ViewProduct />
            },
            {
              path: 'add',
              element: <FormProduct />
            },
            {
              path: 'edit/:id',
              element: <FormProduct />
            }
          ]
        },
        {
          path: '/topic',
          element: (
            <MainLayout>
              <CategoryProvider>
                <Category />
              </CategoryProvider>
            </MainLayout>
          ),
          children: [
            {
              path: '',
              index: true,
              element: <ViewCategory />
            },
            {
              path: 'edit/:id',
              element: <FormTopic />
            }
          ]
        },
        {
          path: '/user',
          element: (
            <MainLayout>
              <User />
            </MainLayout>
          )
        },
        {
          path: '/orders',
          element: (
            <MainLayout>
              <Orders />
            </MainLayout>
          )
        },
        {
          path: '/customer',
          element: (
            <MainLayout>
              <Customer />
            </MainLayout>
          )
        },
        {
          path: '/warehouse',
          element: (
            <MainLayout>
              <WareHouse />
            </MainLayout>
          )
        },
        {
          path: '/bill-inventory',
          element: (
            <MainLayout>
              <BillInventory />
            </MainLayout>
          ),
          children: [
            {
              path: '',
              index: true,
              element: <ViewInventory />
            },
            {
              path: 'add',
              index: true,
              element: <FormInventory />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
