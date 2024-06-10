import React from 'react'
import Navbar from './Navbar'
import welcomeimg from '../assets/inotebookwelcomepic.png'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className='-mt-16 h-screen w-full bg-blue-50'>
        <div className='w-full absolute'>

        <Navbar/>
        </div>
        <div className='flex md:flex-row flex-col-reverse justify-center place-items-center px-4 py-2 sm:px-20 h-screen'>
            <div>

            <h2 className='md:text-6xl text-5xl text-blue-950 font-bold'>Welcome to iNotebook</h2>
              <p className='my-3 sm:text-xl text-lg font-serif'>Your Personal Digital Notebook - Securely Store and Access Your Notes Anywhere, Anytime!</p>
            <button className='btn bg-blue-900 text-white font-semibold'><Link to="/signup">Signup</Link></button>
            </div>
            <img src={welcomeimg} alt="" className='md:w-2/4 w-full' />
        </div>
    </div>
  )
}

export default Welcome