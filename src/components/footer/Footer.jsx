import React from 'react'
import Tab from './Tab'
import { useSelector } from 'react-redux'
import { routes } from '../../utils/routes'
import './css/footer.css'

const Footer = () => {
  const dark = useSelector((state)=> state.theme.value)
  return (
    <div className={dark ? 'footerContainer darkFooter' : 'footerContainer'}>
      {routes.map(route => <Tab route={route}/>)}
    </div>
  )
}

export default Footer