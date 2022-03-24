import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User } from '@leadercodes/leader-header'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Icon from "./utilities/Icon";
import { actions } from "../redux/Action";
import logo from "../images/easy-01.png";
import ShoppingCart from "./shoppingCart/ShoppingCart";

import "../styles/header.css";

function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUserDetails)
  const location = useLocation();
  const [, /*error*/ setError] = useState("");
  const [flag, setFlag] = useState(true);

  //check move to redux
  const userName = localStorage.getItem('userName')
  useEffect(() => {
    if (flag === true && currentUser) {
      let userName = currentUser.email
      dispatch(actions.getUserDetails({ userName }));
      setFlag(false);
    }
    // eslint-disable-next-line 
  }, [currentUser]);
  useEffect(() => window.scrollTo(0, 0), [location])


  return (
    <>
      <header>
        <Navbar
          fixed="top"
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="nav-header"
        >
          <div className="wrapper-left-side-header d-flex align-items-center ">
            <Link to="/" className="link-logo-header ">
              <Image src={logo}></Image>
            </Link>
            <Nav.Item className="link-button-add ">
              <Link to="/add" className="linkAdd">
                <Button variant="warning" className="header-btn d-flex  ">
                  <Icon name="plus2"></Icon>
                  {t("header.link-3")}
                </Button>
              </Link>
            </Nav.Item>
          </div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav " />
          <Navbar.Collapse
            className="navbar-collapse-header distanceW "
            id="responsive-navbar-nav"
          >
            <Nav>
              {!userName && (
                <>
                  <Nav.Item className="login ">
                    <Nav.Link href='https://dev.accounts.codes/EasyCart/login'>
                      {t("header.login")}</Nav.Link>
                  </Nav.Item>
                </>
              )}
              <Nav.Item className="d-flex align-items-center distance mt-1">
                <LanguageDropDown />
              </Nav.Item>
              {userName && (
                <>
                  <Nav.Item className="distance">
                    <UserDropDown
                      currentUser={currentUser}
                      setError={setError}
                    />
                  </Nav.Item>
                  <Nav.Item className="distance mt-1 dropdown-cart">
                    <CartDropDown />
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}
const CartDropDown = (props) => {
  const cart = useSelector(state => state.user.cart);
  const [countItems, setCountItems] = useState(0);
  let count = 0
  useEffect(() => {
    cart?.forEach(c => {
   // eslint-disable-next-line
      count += c.products.length
    })
    setCountItems(count)

  }, [cart, countItems])
  return (

    <NavDropdown className="backColorNone" title={
      <>
        <Icon name="cart" className="d-none cart-icon-header" />
        <span className="badge rounded-pill dnd-badge d-flex justify-content-center" >{countItems}</span>
      </>
    }>
      <ShoppingCart />
    </NavDropdown>
  );
};

const LanguageDropDown = (props) => {

  const { i18n } = useTranslation();
  const [languageView, setLanguageView] = useState("English");
  const history = useHistory();

  const languageOptions = {
    English: "en",
    עברית: "iw",
  };

  useEffect(() => {
    if (!languageOptions[languageView]) history.push("/comming-soon");
    // eslint-disable-next-line
  }, [languageView]);

  const handleLanguage = (entry) => {
    setLanguageView(entry[0]);
    i18n.changeLanguage(entry[1]);
  };
  return (
    <NavDropdown
      title={
        <>
          <Icon name="globe" />
        </>
      }
      id="collasible-nav-dropdown"
    >
      {Object.entries(languageOptions).map((entry, index) => (
        <NavDropdown.Item key={entry[1]}
          className="animate slideIn"
          onClick={() => handleLanguage(entry)}
        >
          {entry[0]}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

const UserDropDown = (props) => {
  const { t } = useTranslation();
  const userDetails = useSelector(state => state.user.currentUserDetails)
  const { currentUser } = props;
  const dispatch = useDispatch();
  const history = useHistory();


  async function handleLogout() {
    document.cookie = "devJwt=";
    localStorage.removeItem('userName')
    dispatch(actions.setCurrentUserDetails())
    window.location = 'https://dev.accounts.codes/EasyCart/login?signout'
    history.push('/')
  }

  const userPane = (
    <button className="icon-btn">
      {userDetails?.profileImg ? (
        <img
          alt=""
          src={userDetails.profileImg}
          style={{ borderRadius: "50%", width: "1.5rem", height: "1.5rem" }}
        />
        //check double variable
      ) : currentUser?.photoURL ? (
        <img
          alt=""
          src={currentUser.photoURL}
          style={{ borderRadius: "50%", width: "1.5rem", height: "1.5rem" }}
        />
      ) :
        (
          <Icon name="user" className="user-icon-header" />
        )
      }
    </button>
  );
  return (
    <NavDropdown
      className="dropDownUser getAllIcons"
      title={userPane}
      id="collasible-nav-dropdown-user"
    >
      <NavDropdown.Item className="text-center styleItem">


        <div className="d-flex justify-content-center align-items-center styleItem mt-3 mb-2">
          <User appName='EasyCart' userName={userDetails?.userName} />
        </div>

        <label className="font-weight-bold">
          {t("user-menu-profile.hello")} &nbsp;
          {currentUser?.firstName || userDetails?.userName}
        </label>
      </NavDropdown.Item>

      <NavDropdown.Item
        className="animate slideIn styleItem mt-3"
        onClick={() => { history.push("/update-profile") }}
      >
        <Icon name="profileDetails" />
        <label>{t("user-menu-profile.my-profile")}</label>
      </NavDropdown.Item>

      {/* <NavDropdown.Divider className="m-0" />
      <NavDropdown.Item className="animate slideIn styleItem" href="/dashboard">
        <Icon name="dashboard" />
        <label>{t("user-menu-profile.my-dashboard")}</label>
      </NavDropdown.Item> */}

      <NavDropdown.Divider className="m-0" />
      <NavDropdown.Item className="animate slideIn styleItem"
        onClick={() => { history.push("/favorites") }}>
        <Icon name="favorite" />
        <label>{t("user-menu-profile.my-favorites")}</label>
      </NavDropdown.Item>

      <NavDropdown.Divider className="m-0" />
      <NavDropdown.Item
        className="animate slideIn styleItem"
        onClick={() => { history.push("/my-businesses") }}
      >
        <Icon name="myBusiness" />
        <label>{t("user-menu-profile.my-businesses")}</label>
      </NavDropdown.Item>
      <NavDropdown.Divider className="m-0" />
      <NavDropdown.Item className="animate slideIn styleItem" onClick={() => { history.push("/add") }}>
        <Icon name="add" />
        <label>{t("user-menu-profile.add-business")}</label>
      </NavDropdown.Item>
      <NavDropdown.Divider className="m-0" />
      <NavDropdown.Item onClick={() => handleLogout()} className="animate slideIn styleItem" >
        <Icon name="logout" />
        <label type="button">
          {t("user-menu-profile.logout")}
        </label>
      </NavDropdown.Item>
      <NavDropdown.Divider className="m-0" />
    </NavDropdown>
  );
};


export default Header;