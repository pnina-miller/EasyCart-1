import React from "react";
import { useSelector } from "react-redux";
import { ProSidebar, Menu, MenuItem, SidebarContent, SubMenu } from "react-pro-sidebar";
import { useHistory } from "react-router-dom";
import Parser from "html-react-parser";

import iconPath from "../../IconLib";

import "bootstrap/dist/css/bootstrap.min.css";


function Aside(props) {

  const { collapsed, rtl, toggled, handleToggleSidebar } = props;

  const businessUesers = useSelector(state => state.user?.currentUserDetails?.business);
  const history = useHistory();
  const logout = () => { }

  async function handleLogout() {
    try {
      await logout();
      history.push("/")
    } catch {
    }
  }

  return (

    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarContent>
        <Menu iconShape="circle">

          <MenuItem className="fontDashboard  mt-5">
            Main
            <hr className="hrUnderline"></hr>
          </MenuItem>

          <MenuItem
            icon={Parser(iconPath["Heart"])}
            className="fontDashboard text-light men icon-color"
            onClick={() => history.push("/favorites")}
          >
            My Favorites
          </MenuItem>

          <MenuItem
            icon={Parser(iconPath["order"])}
            className="fontDashboard text-light men icon-color"
            onClick={() => history.push("/my-orders")}
          >
            My orders
          </MenuItem>

          <MenuItem className="fontDashboard mt-3">
            Business
            <hr className="hrUnderline"></hr>
          </MenuItem>

          <Menu iconShape="circle">
            <SubMenu
              icon={Parser(iconPath["order"])}
              className="fontDashboard text-light men icon-color h-aside business-list"
              title={"Orders"}
            >
              {businessUesers?.map((business, i) =>
                <MenuItem
                  onClick={() => history.push({ pathname: `/orders/${business.keyWords}`, state: { currentBusiness: business._id } })}
                >
                  {business.businessName}
                </MenuItem>
              )}
            </SubMenu>
          </Menu>

          <MenuItem
            icon={Parser(iconPath["star"])}
            className="fontDashboard text-light menicon-color"
            onClick={() => history.push("/my-businesses")}
          >
            My businesses
          </MenuItem>

          <MenuItem
            icon={Parser(iconPath["dashboard"])}
            className="fontDashboard text-light men icon-color"
            onClick={() => history.push("/dashboard")}
          >
            Dashboard
          </MenuItem>

          <MenuItem className="fontDashboard mt-3">
            Acount
            <hr className="hrUnderline"></hr>
          </MenuItem>

          <MenuItem
            className="removeBG fontDashboard text-light men icon-color"
            icon={Parser(iconPath["profile"])}
            onClick={() => history.push("/update-profile")}
          >
            My Profile
          </MenuItem>

          <MenuItem
            icon={Parser(iconPath["logout"])}
            className="fontDashboard text-light icon-color"
            onClick={handleLogout}
          >
            Logout
          </MenuItem>

        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Aside
