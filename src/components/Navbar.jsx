import React from 'react'
import "./Navbar.css";

import { TbBrandInstagram } from "react-icons/tb";
import { TbBrandYoutube } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";


const Navbar = () => {
    return (
        <nav>
            <ul>
                <li className='tnb-todo-txt'>
                    <img className='tnb-symb' src='./src/assets/CodeGSlogo.jpg' alt="logo" />
                    <a className='tnb-links name' href=''>Pass<span className='WRD'>WRD</span></a>
                </li>
                <li className='tnb-todo-txt icn-margn'>
                    <a className='tnb-links scl-icns' target='_main' href='https://www.instagram.com/code33gs/'><TbBrandInstagram/></a>
                    <a className='tnb-links scl-icns' target='_main' href='https://youtube.com/@code33GS'><TbBrandYoutube/></a>
                    <a className='tnb-links scl-icns' target='_main' href='https://github.com/code33GS'><TbBrandGithub/></a>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar
