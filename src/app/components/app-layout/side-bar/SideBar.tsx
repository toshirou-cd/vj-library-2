import React from "react";
import SideBarData from "./SideBarData";
import { Menu, Sidebar, Image } from "semantic-ui-react";
import { BrowserRouter, NavLink, useRouteMatch } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import "./SideBar.css";
const SideBar:React.FC<{routerPath : string}> = (props) => {
  const match = useRouteMatch()
  return (
    <div>
      <Sidebar as={Menu} vertical animation="uncover" visible={true} className="SideBar">
        <Image src={Logo} size="small" className="Logo" />
          {SideBarData.map((val, key) => {
            console.log("Hi",match)
            return (
              <Menu.Item
                as={NavLink}
                to={`${props.routerPath}${val.path}`}
                activeClassName="Selected"
                className="MenuItem"
                fitted="horizontally"
                key={key}
                >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </Menu.Item>
            );
          })}
      </Sidebar>
    </div>
  );
};

export default SideBar;
