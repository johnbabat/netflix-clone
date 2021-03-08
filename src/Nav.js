import React, { useEffect, useState} from 'react'
import './Nav.css'

function Nav() {

    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        });
    }, [])

    return (
        <div className={`nav ${scroll && "nav_black"}`}>
            <img 
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <img 
                className="nav_avatar"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                alt="User Avatar"
            />
        </div>
    )
}

export default Nav
