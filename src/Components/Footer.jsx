import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
 <div className="w-full dark:text-white text-gray-900 px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 h-auto sm:h-[70px] bg-gray-100 dark:bg-[#111]">
  <div className="text-center sm:text-left">
      <p className='dark:text-white text-gray-900 font-semibold'>© 2024 EV Route. All rights reserved.</p>
  </div>
  <div className='flex flex-wrap justify-center sm:flex-nowrap sm:justify-end gap-2 sm:gap-8 dark:text-gray-200 text-gray-900'>
      <Link>Privacy Policy </Link>
      <span className='text-white'>|</span>
      <Link>Terms of Service</Link>
      <span>|</span>
      <Link> Contact</Link>
  </div>
</div>

  )
}

export default Footer