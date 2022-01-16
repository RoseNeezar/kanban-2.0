import React from 'react'
import { useLocation } from 'react-router-dom'

const Home: React.FC = () => {
  const location = useLocation()

  return (
    <div tw="min-h-screen bg-gray-400 flex justify-center items-center ">
      <div tw="container rounded-md flex items-center justify-center h-72 bg-gray-500">
        <button tw="bg-gray-600 p-4 rounded-md m-3 text-white">Todo</button>
        <button tw="bg-gray-600 p-4 rounded-md m-3 text-white">Todo</button>
      </div>
    </div>
  )
}

export default Home
