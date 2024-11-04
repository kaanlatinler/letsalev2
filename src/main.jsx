import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './pages/profile'
import AddListing from './pages/add-listing'
import { Toaster } from './components/ui/toaster'
import SearchByCategory from './pages/search/[category]'
import SearchByOptions from './pages/search'
import ListingDetails from './pages/listing-details/[id]'

const router = createBrowserRouter([
{
  path: '/',
  element: <Home />,
},
{
  path: '/profile',
  element: <Profile />,
},
{
  path: '/add-listing',
  element: <AddListing />,
},
{
  path: '/search/:category',
  element:<SearchByCategory />
},
{
  path: '/search',
  element:<SearchByOptions />
}
,
{
  path: '/listing-details/:id',
  element:<ListingDetails />
}
])

const PUBLISHABLE_KEY= import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY){
  throw new Error('Missing PUBLISHABLE_KEY')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster  />
    </ClerkProvider>
  </StrictMode>,
)
