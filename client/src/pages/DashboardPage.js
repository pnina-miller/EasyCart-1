import React from 'react'

import HemletComponent from "../components/utilities/hemlet";
import Logo from "../images/logo.png";
import Layout from '../components/dashboardPage/Layout'

export default function DashboardPage() {
  const seoTitle = "Dasboard | EasyCart";
  const seoDescription =
    "Dasboard description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];
  return (

    <>
          <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />
      <Layout />
    </>
  )
}
