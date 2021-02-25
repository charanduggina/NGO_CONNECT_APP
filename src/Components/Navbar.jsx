import React, {useState} from "react";
import * as vscIcons from "react-icons/vsc";
import * as aiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import {SidebarText} from './SidebarText';
import './Navbar.css';
import { IconContext } from 'react-icons'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div>
    <IconContext.Provider value={{color: 'orange'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <vscIcons.VscListFlat onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="nav-toogle">
            <Link to="#" className="menu-bars">
              <aiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarText.map((item,index)=>{
              return (
                  <li key={index} className={item.cName}>
                      <Link to={item.Path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                  </li>
              )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
