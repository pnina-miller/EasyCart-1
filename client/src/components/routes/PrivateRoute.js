import axios from "axios";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Route } from "react-router-dom"
// import configData from '../config.json'

function redirectToLogin(routes) {
  window.location.href = routes ?
    `https://dev.accounts.codes/EasyCart/login?routes=${routes}` :
    `https://dev.accounts.codes/EasyCart/login`;
  return null
}

export default function PrivateRoute({ render, user, component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const currentUser = useSelector(state => state.user.currentUserDetails)
  let routes = rest.computedMatch.path;
  let userName = localStorage.getItem('userName') 

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false)
      setIsLoggedIn(false)
      return;
    }
    const isPermission = async () => {
      if (user && !currentUser) {
        let res = await fetch(`/user/getUserDetailsByToken/${user}`)
        const data = await res.json()
         // eslint-disable-next-line
        userName = data.user.userName 
      }
      const isLocal = window.location.hostname === "localhost"
      const url = `/user/${userName}/isPermission?isLocal=${isLocal}`;
      try {
        const response = await axios({
          method: 'GET',
          url: url,
          headers: {
            Authorization: user,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      })
        if (response.status === 401 || response.status === 500) {
          setIsLoading(false)
          setIsLoggedIn(true)
        }
        else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error);
      }
    }
    isPermission()

  }, [currentUser])
  return (<>{
    isLoading ? <h1>loading...</h1>
      : isLoggedIn ? redirectToLogin(routes)
        : render ? <Route {...rest} render={render} />
          : <Route {...rest} render={props => <Component {...props} />}></Route>
  }</>)
}