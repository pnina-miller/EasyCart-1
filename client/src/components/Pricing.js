import React from "react";
import Icon from "/utilities/Icon";
import { Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/pricing.css";

function Pricing() {
  const { t } = useTranslation();
  return (
    <section className="pricing-section">
      <div className="pricing pricing-palden">
        <div
          className="pricing-item features-item ja-animate minHeightPricung"
          data-animation="move-from-bottom"
          data-delay="item-0"
        >
          <div className="pricing-deco">
            <h3 className="pricing-title">
              {t('pricing.basic')}
            </h3>
            <div className="pricing-price pricing-circle">
              ${t('pricing.free')}
              <span className="pricing-period">/ mo</span>
            </div>
          </div>
          <p>{t('pricing.basic-terms')}</p>
          <ul className="pricing-feature-list">
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.basic-d-1')}
            </li>
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.basic-d-2')}
            </li>
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.basic-d-3')}
            </li>
          </ul>
          <Button variant="outline-dark" className="btn-pricing" onClick={() => window.open('https://pay.leader.codes/yaek@leader.codes/TranzilaIframe?sum=' + t('pricing.professional-price'))}>
            {t('pricing.button')}</Button>
        </div>

        <div
          className="pricing-item features-item ja-animate pricing__item--featured"
          data-animation="move-from-bottom"
          data-delay="item-1"
        >
          <div className="pricing-deco">
            <h3 className="pricing-title">
              {t('pricing.extended')}
            </h3>
            <div className="pricing-price pricing-circle">
              ${t('pricing.extended-price')}
              <span className="pricing-period">/ mo</span>
            </div>
          </div>
          <p>
            {t('pricing.extended-terms')}
          </p>
          <ul className="pricing-feature-list">
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.extended-d-1')}
            </li>
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.extended-d-2')}
            </li>
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.extended-d-3')}
            </li>
          </ul>
          <Button variant="warning" className="btn-pricing btn-color">
            {t('pricing.button')}
          </Button>
        </div>

        <div
          className="pricing-item features-item ja-animate"
          data-animation="move-from-bottom"
          data-delay="item-2"
        >
          <div className="pricing-deco">
            <h3 className="pricing-title">{t('pricing.professional')}</h3>
            <div className="pricing-price pricing-circle">
              ${t('pricing.professional-price')}
              <span className="pricing-period">/ mo</span>
            </div>
          </div>
          <p> {t('pricing.professional-terms')}</p>
          <ul className="pricing-feature-list">
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.professional-d-1')}
            </li>
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.professional-d-2')}
            </li>
            <li className="pricing-feature">
              <Icon name="checkCircle" />
              {t('pricing.professional-d-3')}
            </li>
          </ul>
          <Button  variant="outline-dark" className="btn-pricing" onClick={() => window.open('https://pay.leader.codes/yaek@leader.codes/TranzilaIframe?sum=' + t('pricing.professional-price'))}>
            {t('pricing.button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
export default Pricing;
