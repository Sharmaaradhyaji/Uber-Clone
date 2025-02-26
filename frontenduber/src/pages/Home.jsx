import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className="w-16 ml-8" src="https://banner2.cleanpng.com/20181110/bgu/kisspng-logo-brand-product-design-font-1713924320463.webp" alt="" />
        <div className="bg-white pb-7 py-4 px-4">
            <h2 className='text-3xl font-bold'>get started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
