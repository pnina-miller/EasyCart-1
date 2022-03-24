import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import BusinessPage from "../../pages/BusinessPage";
import ResultsOfSearch from "../../pages/SearchResultsPage";
import UserProfile from "../../pages/UserProfilePage";
import { actions } from "../../redux/Action";
import { getUserByUserName } from "../../services/user";

function Routing(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const result = props.match.params.keyword;
  const [exsistInBusiness, setExsistInBusiness] = useState(false);
  const CheckedBusinessDetails = useSelector(
    (state) => state.business.CheckedBusinessDetails
  );
  const [checkUser, setCheckUser] = useState(
    useSelector((state) => state.user.checkUser)
  );

  useEffect(() => {
    setExsistInBusiness(false);
    if (location.state !== undefined) {
      location.state.db === "business" && setExsistInBusiness(true);
    } else {
      getUserByUserName(result).then((data) => setCheckUser(data));
      dispatch(actions.getBusinessByKeyWord({ keyWord: result }));
      // dispatch(actions.checkUserDetails(result));
    }
    // eslint-disable-next-line
  }, [dispatch, location]);

  useEffect(() => {
    let txt = result;

    if (txt !== undefined && location.state === undefined) {
      CheckedBusinessDetails !== ""
        ? setExsistInBusiness(true)
        : setExsistInBusiness("not");
    } // eslint-disable-next-line
  }, [CheckedBusinessDetails]);

  return (
    <>
      <div>
        {exsistInBusiness === true ? (
          <BusinessPage />
        ) : checkUser ? (
          <UserProfile user={checkUser} />
        ) : (
          exsistInBusiness !== "not" && <ResultsOfSearch />
        )}
      </div>
    </>
  );
}
export default Routing;
