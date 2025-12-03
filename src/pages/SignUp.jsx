import React, { useState } from 'react'
import { Input, Button } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/AuthContext.jsx'
import NaveBar from '../Components/Navbar-second.jsx'
function SignUp() {
  const [name, setName] = useState("")
  const [last, setLast] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const { signup  } = useAuth()
  const navigate = useNavigate()

 const handleSignUp = async () => {
  if (password !== confirm) {
    setError("Passwords do not match");
    return;
  }
  const res = await signup  (name, last, username, email, password);
  if (!res.success) {
    setError(res.message);
    return;
  }

  navigate("/login"); 
};


  return (
    <>
    <NaveBar title="Already have an account?" link="/login" button="Log In" />
    <div className='flex flex-col md:flex-row gap-10 md:gap-24 mb-3 ml-2 md:ml-10 items-center md:items-start justify-center p-4'>
      <div className="dark:bg-[url('/images/car-5.jpg')] bg-[url('/images/car-9.jpg')]  h-[250px] w-[300px] sm:h-[400px] sm:w-[350px] md:h-[500px] md:w-[400px] bg-cover  mt-10 md:mt-20 ml-0 md:ml-6 rounded-lg" />
      <div className='flex flex-col gap-1 w-full md:w-auto px-4 sm:px-6 md:px-0'>
        <h1 className='dark:text-white font-bold text-3xl mt-10 md:mt-24 font-sans text-gray-900'>Create Your Account</h1>
        <p className='dark:text-gray-400 mb-3 text-gray-900'>Find charging stations and plan your next journey with ease</p>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className='flex flex-col gap-2'>
          <h1 className='dark:text-white mt-1 font-semibold text-gray-900'>Username</h1>
          <Input
            placeholder="Enter Name"
            size="md"
            value={username}
            onValueChange={setUsername}
            className="w-full sm:w-[360px]"
          />
        </div>

        <div className='flex flex-col sm:flex-row gap-3 mt-4'>
          <Input
            placeholder="First Name"
            size="md"
            value={name}
            onValueChange={setName}
            className="w-full sm:w-[170px]"
          />
          <Input
            placeholder="Last Name"
            size="md"
            value={last}
            onValueChange={setLast}
            className="w-full sm:w-[170px]"
          />
        </div>

        <Input
          placeholder="Email"
          type="email"
          size="md"
          value={email}
          onValueChange={setEmail}
          className="w-full sm:w-[360px] mt-3"
        />

        <div className='flex flex-col sm:flex-row gap-3 mt-3'>
          <Input
            placeholder="Password"
            type="password"
            size="md"
            value={password}
            onValueChange={setPassword}
            className="w-full sm:w-[170px]"
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            size="md"
            value={confirm}
            onValueChange={setConfirm}
            className="w-full sm:w-[170px]"
          />
        </div>

        <Button
          onPress={handleSignUp}
          color="primary"
          className="w-full sm:w-[360px] font-semibold mt-5"
          radius="sm"
          size="lg"
        >
          Create Account
        </Button>
      </div>
    </div>
      </>
  )
}

export default SignUp
