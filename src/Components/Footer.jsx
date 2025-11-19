import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
 <div className="w-full text-white px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 h-auto sm:h-[70px] ">
  <div className="text-center sm:text-left">
      <p className='text-white font-semibold'>© 2024 EV Route. All rights reserved.</p>
  </div>
  <div className='flex flex-wrap justify-center sm:flex-nowrap sm:justify-end gap-2 sm:gap-8 text-gray-200'>
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