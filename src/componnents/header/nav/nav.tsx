// Import
import { useState } from "react";

import { Interface } from "readline";
import { LinkHTMLAttributes } from "react";

// Interface state
interface IState{
    naviguation: string[];
}

const Nav = ({ naviguation }: IState) => {

    
    return(
        <nav>
            <div className="nav-shape"></div>
            <div className="nav-container">
                <div className="Logo"></div>
                <ul className="menu-container">
                    {
                        naviguation.map((menu, index) => 
                        <a href="" key={index}>
                            <li className="menu-link">{menu}</li>
                        </a>
                        )
                    }
                </ul>
                <div className="user-action">
                    <a href="">
                        Login
                    </a>
                    <a href="">
                        Shop
                    </a>
                </div>
            </div>
        </nav>
    )
}
export default Nav