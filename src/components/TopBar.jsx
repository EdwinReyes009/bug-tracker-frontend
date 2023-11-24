import React from 'react'

export const TopBar = (props) => {
  return (
    <div className='bg-yummy-800 w-100% h-16 shadow-md flex items-center'>
        <h1 className='flex px-72 font-bold text-white'>{props.page}</h1>
    </div>
  )
}

export default TopBar