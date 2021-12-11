import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarData } from './components/sidebar/sidebar';
import './Navbar.css';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
function NavBar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className='navbar' >


                <button className='menu-bars' style={{ border: "none", cursor: "pointer", color: "black" }} onClick={showSidebar} >
                    <MenuIcon />
                </button>
                <div style={{ marginLeft: "90%" }}>
                    <button style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
                        <div style={{ display: "flex" }}><PersonIcon sx={{ marginTop: "15%" }} />  <h3>Perfil</h3></div>
                    </button>
                </div>

            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars' style={{ color: "red" }}>
                            <CloseIcon />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default NavBar;
