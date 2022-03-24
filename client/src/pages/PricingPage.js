import React from "react";
import HemletComponent from "../components/utilities/hemlet";

import Logo from "../images/logo.png";

export default function PricingPage() {
    const seoKeywords=["Business", "EasyCart"];
    const seoTitle = "Pricing | EasyCart";
    const seoDescription =
    "Pricing description content. this s going to contain few lines about this page";
    const seoImage = Logo;

  return (
    <div>
         <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />

      <br/><br/>
      <div>Pricing Page</div>
    </div>
  );
}
