import React, { useState } from 'react'
import { Input, Button } from '@heroui/react'

function SignUp() {
  const [name, setName] = useState("")
  const [last, setLast] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  return (
    <>
      <div className='flex flex-col md:flex-row gap-10 md:gap-24 mb-3 ml-5 md:ml-10 items-center md:items-start justify-center'>
        <div className="bg-[url('/images/car-5.jpg')] h-[250px] w-[300px] sm:h-[400px] sm:w-[350px] md:h-[500px] md:w-[400px] bg-cover mt-10 md:mt-20 ml-0 md:ml-6 rounded-lg">
        </div>

        <div className='flex flex-col gap-1 w-full md:w-auto px-4 sm:px-6 md:px-0'>
          <h1 className='dark:text-white font-bold text-3xl mt-10 md:mt-24 font-sans text-gray-900'>Create Your Account</h1>
          <p className='dark:text-gray-400 mb-3 text-gray-900'>Find charging stations and plan your next journey with ease</p>

          <div className='flex flex-col gap-2'>
            <h1 className='dark:text-white mt-1 font-semibold text-gray-900'>Username</h1>
            <Input
              isClearable
              key="outside"
              labelPlacement="outside"
              placeholder="Enter Name"
              type="text"
              size="md"
              color="default"
              variant="faded"
              radius="sm"
              onClear={() => console.log("input cleared")}
              className="w-full sm:w-[360px]"
              value={username}
              onValueChange={setUsername}
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <div className='flex flex-col gap-2 w-full sm:w-auto'>
              <h1 className='dark:text-white mt-1 font-semibold text-gray-900 '>First Name</h1>
              <Input
                isClearable
                key="outside"
                labelPlacement="outside"
                placeholder="First"
                type="text"
                size="md"
                color="default"
                variant="faded"
                radius="sm"
                onClear={() => console.log("input cleared")}
                className="w-full sm:w-[170px]"
                value={name}
                onValueChange={setName}
              />
            </div>

            <div className='flex flex-col gap-2 w-full sm:w-auto'>
              <h1 className='dark:text-white mt-1 font-semibold text-gray-900'>Last Name</h1>
              <Input
                isClearable
                key="outside"
                labelPlacement="outside"
                placeholder="Last"
                type="text"
                size="md"
                color="default"
                variant="faded"
                radius="sm"
                onClear={() => console.log("input cleared")}
                className="w-full sm:w-[170px]"
                value={last}
                onValueChange={setLast}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <h1 className="dark:text-white mt-1 font-semibold text-gray-900">Email</h1>
            <Input
              isClearable
              key="outside"
              labelPlacement="outside"
              placeholder="you@example.com"
              type="email"
              size="md"
              color="default"
              variant="faded"
              radius="sm"
              onClear={() => console.log("input cleared")}
              className="w-full sm:w-[360px]"
              value={email}
              onValueChange={setEmail}
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <div className='flex flex-col gap-2 w-full sm:w-auto'>
              <h1 className='dark:text-white mt-1 font-semibold text-gray-900'>Password</h1>
              <Input
                isClearable
                key="outside"
                labelPlacement="outside"
                placeholder="Enter password"
                type="password"
                size="md"
                color="default"
                variant="faded"
                radius="sm"
                onClear={() => console.log("input cleared")}
                className="w-full sm:w-[170px]"
                value={password}
                onValueChange={setPassword}
              />
            </div>

            <div className='flex flex-col gap-2 w-full sm:w-auto'>
              <h1 className='dark:text-white mt-1 font-semibold text-gray-900'>Confirm Password</h1>
              <Input
                isClearable
                key="outside"
                labelPlacement="outside"
                placeholder="Enter password"
                type="password"
                size="md"
                color="default"
                variant="faded"
                radius="sm"
                onClear={() => console.log("input cleared")}
                className="w-full sm:w-[170px]"
                value={confirm}
                onValueChange={setConfirm}
              />
            </div>
          </div>

          <div className="mt-5">
            <Button color="primary" className="w-full sm:w-[360px] font-semibold" radius="sm" size="lg">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
