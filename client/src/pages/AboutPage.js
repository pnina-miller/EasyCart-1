import React from "react";
import { useTranslation } from "react-i18next";
import HemletComponent from "../components/utilities/hemlet";
import {Container} from 'react-bootstrap'
import Logo from "../images/logo.png";

export default function AboutPage() {
  const { t } = useTranslation();
  const seoTitle = t('about.seo-title');
  const seoDescription =t('about.seo-description');
  const seoImage = Logo;
  const seoKeywords=["about", "EasyCart"];

  return (
    <div>
      <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />

      <Container>
              <h5>{t('about.about-title')}</h5>
              <br />
              {t('about.about-general')}
      </Container>
      
    </div>
  );
}
// tagging example

  /* 
      <div itemScope itemType="http://schema.org/Event">
        בואו לשמוע את
        <span itemProp="name">Tiny Tim Tribute Band</span>, בהופעה חיה בתאריך
        <span itemProp="startDate" content="2013-07-06">
          6 ביולי 2013
        </span>
        <span itemprop="location" itemScope itemType="http://schema.org/Place">
          <span itemProp="name">ב-Regency Theater</span> המקסים!
        </span>
      </div> */
