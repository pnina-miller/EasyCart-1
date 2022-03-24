import React from "react";
import Helmet from "react-helmet";

import Logo from "../images/logo.png";

export default function SecurityPage() {
  const seoTitle = "Security | EasyCart";
  const seoDescription =
    "Security description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  
  return (
      
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:description" content={seoDescription} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={seoImage} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
      </Helmet>
      <div>Security Page</div>
    </>
  );
}
