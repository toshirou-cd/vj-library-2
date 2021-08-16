import React, { useEffect, useState } from "react";
import { Menu, Sidebar, Image } from "semantic-ui-react";
import { BrowserRouter, NavLink, useRouteMatch } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import "./SideBar.css";
import { NavItem } from "@app/models/side-bar-tab-item";

export interface SideBarProps {
  routerPath: string;
  items?: NavItem[];
}

const SideBar:React.FC<SideBarProps> = (props) => {
  const [subMenu, setSubMenu] = useState(false)
  const showSubMenu = () => setSubMenu(!subMenu)
  return (
    <div>
      
      <Sidebar as={Menu} vertical animation="uncover" visible={true} className="SideBar">
        <Image src={Logo} size="small" className="Logo" />
          {props.items?.map((val, key) => {
            return (
              <>
              <Menu.Item
              onClick={showSubMenu}
              as={val.subMenu? null :NavLink}
              to={`${props.routerPath}${val.path}`} 
              activeClassName="Selected"
              className="MenuItem"
              fitted="horizontally"
              key={key}
              >
                <div id="icon">{val.Icon}</div>
                <div id="title">{val.title}</div>
              </Menu.Item>
              {subMenu && 
                val.subMenu?.map((item,index)=> {
                  return (
                    <Menu.Item 
                    className="MenuItem"
                    key={index}
                    // as={NavLink}
                    // to={item.path}
                    activeClassName="Selected"
                    >
                      <div  id="icon">{item.Icon}</div>
                       <div id="title">{item.title}</div>
                    </Menu.Item>
                  )
                })}
                </>
            );
          })}
      </Sidebar>
    </div>
  );
};

export default SideBar;
