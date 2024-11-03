import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const {user, isSignedIn}=useUser();
  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
      <Link to={'/'}><img src='/Images/logo.svg' width={150} height={100}/></Link>

      <ul className='hidden md:flex gap-16'>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link to={'/'}>Home</Link></li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link>Search</Link></li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link>New</Link></li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link>Preowned</Link></li>
      </ul>

      {isSignedIn ? <div className='flex items-center gap-5'>
        <UserButton/>
        <Link to={'/profile'}><Button>Submit Listing</Button></Link>
      </div>: <div className='flex items-center gap-5'>
        <Button><SignInButton mode='modal' forceRedirectUrl='/' /></Button>
        <Button>Submit Listing</Button>
        </div>}

    </div>
  )
}

export default Header