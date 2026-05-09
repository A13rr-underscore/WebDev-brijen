import React from 'react'
import { Link } from 'react-router-dom'
import Contact from '../assets/pages/Contact'
import Home from '../assets/pages/Home'
import About from '../assets/pages/About'
export const NavBar = () => {
  return (
    <nav>
<Link to ="/" >About</Link>
<Link to ="/Contact" >Contact</Link>
<Link to ="/Home" >Home</Link>

    </nav>
    
  )
}

export default NavBar