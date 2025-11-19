import React, { useState } from 'react'
import { Input, Button } from '@heroui/react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [reset, setReset] = useState("")
  return (
    <div className='min-h-screen w-full flex justify-center items-center px-4 sm:px-6 md:px-8'>
      <div className='flex flex-col gap-3 justify-center w-full max-w-md'>
        <h1 className='text-white text-2xl sm:text-3xl font-semibold flex justify-center mb-2'>EVPath</h1>

        <div className='w-full rounded-md bg-white flex flex-col p-5 sm:p-6 md:p-7 shadow-lg'>
          <h1 className='text-black font-bold text-center text-xl sm:text-2xl md:text-3xl mb-2'>
            Reset Your Password
          </h1>
          <p className='text-xs sm:text-sm text-gray-400 text-center mb-4'>
            Enter the email address associated with your account, and we'll send you a link to reset your password
          </p>

          <div className="flex flex-col gap-2 mb-3 w-full">
            <h1 className="text-black mt-1 text-sm sm:text-base">Email Address</h1>
            <Input
              isClearable
              key="outside"
              labelPlacement="outside"
              placeholder="Enter your email"
              type="email"
              size="sm"
              color="default"
              variant="bordered"
              radius="sm"
              onClear={() => console.log("input cleared")}
              className="w-full"
              value={reset}
              onValueChange={setReset}
            />
          </div>

          <div className="mt-3 flex justify-center">
            <Button color="primary" className="w-full font-semibold" radius="sm" size="md">
              Login
            </Button>
          </div>

          <div className='text-sm underline text-gray-500 flex justify-center mt-4 hover:text-gray-700'>
            <Link to="/login">Return to login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
