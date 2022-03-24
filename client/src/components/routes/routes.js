import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "../routes/PrivateRoute";
import Header from "../Header";
import AboutPage from "../../pages/AboutPage";
import CommingSoonPage from "../../pages/CommingSoonPage";
import ContactPage from "../../pages/ContactPage";
import DashboardPage from "../../pages/DashboardPage";
import ErrorPage from "../../pages/ErrorPage";
import FavoritesPage from "../../pages/FavoritesPage";
import HelpPage from "../../pages/HelpPage";
import PlacePage from "../../pages/PlacePage";
import PricingPage from "../../pages/PricingPage";
import PricingAddBusiness from "../addBusinessPage‏/PricingAddBusiness";
import SecurityPage from "../../pages/SecurityPage";
import TermsPage from "../../pages/TermsPage";
import UpdateUserProfilePage from "../../pages/UpdateUserProfilePage";
import UserBusinessesPage from "../../pages/UserBusinessesPage";
import Routing from "./searchRoute.js";
import { actions } from "../../redux/Action";
import Reviews from "../businessPage/Reviews";
import ResultsOfSearch from "../../pages/SearchResultsPage";
import AddBuisnessPage2 from "../../pages/AddBusinessPage2";
import OrdersTablePage from "../../pages/OrdersPage";
import UserOrdersPage from "../../pages/userOrdersPage";
import PersonalAreaPage from "../PersonalAreaPage";
import SearchPlacesByLocation from "../../pages/SearchPlacesByLoation";
import SearchPlacesByCategory from "../../pages/SearchBusinessesByCategory";
import ListOfCities from "../../pages/ListOfCities";
import HomePage from "../../pages/HomePage";
import ShoppingCartPage from "../../pages/ShoppingCartPage";

function MainRoute() {

  const dispatch = useDispatch();
  let userId = useSelector((state) => state.user.currentUserDetails?._id);
    let jwtKey = window.location.href.includes("dev") ? "devJwt" : "jwt";
  let TokenToString = document.cookie?.includes(jwtKey) ? document.cookie.split(";")
    .filter(s => s.includes(jwtKey))[0].split("=").pop() : null;

  useEffect(() => {
    dispatch(actions.extractJwt());
    let userName = localStorage.getItem("userName");
    userName && dispatch(actions.getUserByUserName(userName));

    //check
    dispatch(actions.getMainCategories());
    dispatch(actions.allNamesOfBusinesses());

    userId && dispatch(actions.getCart(userId));
  });
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/pricing-business" component={PricingAddBusiness} />
        <Route path="/help" component={HelpPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/security" component={SecurityPage} />
        <Route path="/404" component={ErrorPage} />
        <Route path="/comming-soon" component={CommingSoonPage} />
        <Route path="/place/:id" component={PlacePage} />
        <Route path="/search/:keyword" component={ResultsOfSearch} />

        <Route path="/search" component={SearchPlacesByLocation} />
        <Route path="/category" component={SearchPlacesByCategory} />
        <Route path="/cities" component={ListOfCities} />
        <Route path="/ShoppingCart" component={ShoppingCartPage} />

        <PrivateRoute
          exact
          path="/:keyWord/update"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <AddBuisnessPage2 />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <DashboardPage />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          exact
          path="/favorites"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <FavoritesPage />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          exact
          path="/add"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <AddBuisnessPage2 />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          path="/my-businesses"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <UserBusinessesPage />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          path="/reviews"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <Reviews />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          exact
          path="/favorites"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <FavoritesPage />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          path="/reviews"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <Reviews />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          path="/orders/:name"
          user={TokenToString}
          render={(props) => (
            <PersonalAreaPage>
              <OrdersTablePage {...props} />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          path="/my-orders"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <UserOrdersPage />
            </PersonalAreaPage>
          )}
        />
        <PrivateRoute
          path="/update-profile"
          user={TokenToString}
          render={() => (
            <PersonalAreaPage>
              <UpdateUserProfilePage />
            </PersonalAreaPage>
          )}
        />

        <Route path="/:keyword" component={Routing} />
      </Switch>
    </Router>
  );
}

export default MainRoute;
