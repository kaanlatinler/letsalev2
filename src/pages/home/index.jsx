
import Category from '@/components/Category'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import InfoSection from '@/components/InfoSection'
import MostSearchCar from '@/components/MostSearchCar'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
       <Header />
       <Hero />
       <Category />
       <MostSearchCar />
       <InfoSection />
       <Footer />
    </div>
  )
}

export default Home