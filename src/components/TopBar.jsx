import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faCircleQuestion, faGear, faUser} from '@fortawesome/free-solid-svg-icons';

export const TopBar = (props) => {
 
  return (

    <div className={`pl-12 bg-yummy-800 w-full h-16 shadow-md flex items-center`}>
    <h1 className='flex px-20 font-bold text-white'>{props.page}</h1>
  
    <div className='ml-auto mr-8 flex items-center gap-4'>
      <FontAwesomeIcon icon={faBell} className='text-5xl text-white' style={{ width: '25px', height: '20px' }} />
      <FontAwesomeIcon icon={faCircleQuestion} className='text-5xl text-white' style={{ width: '25px', height: '20px' }} />
      <FontAwesomeIcon icon={faGear} className='text-5xl text-white' style={{ width: '25px', height: '20px' }} />
      <FontAwesomeIcon icon={faUser} className='text-5xl text-white' style={{ width: '25px', height: '20px' }} />
    </div>
  </div>
  )
}

export default TopBar