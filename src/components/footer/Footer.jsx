import React from 'react'
import Tab from './Tab'
import { routes } from '../../utils/routes'
import './css/footer.css'

const Footer = () => {

  return (
    <div className='footerContainer'>
      {routes.map(route => <Tab route={route}/>)}
    </div>
  )
}

export default Footer