import React from "react";
import Icon from "../utilities/Icon";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/Action'

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/pricing.css";

export default function PricingAddBusiness() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const [toggled, setToggled] = useState(false);
  // const [collapsed, /*setCollapsed*/] = useState(false);


  // const handleToggleSidebar = (value) => {
  //   setToggled(value);
  // };


  async function check(paymentPackage) {
    await dispatch(actions.setPaymentPackageOfBusiness(paymentPackage))
    // history.push({{pathname:"/add",state:Business}})
  }
  return (
    <Container fluid> 
      <Row>
        {/* <Col xs={4} className="pt-4 pl-0">
          <div className={`mt-4 app ${toggled ? 'toggled' : ''}`}>
            <Aside
              collapsed={collapsed}
              toggled={toggled}
              handleToggleSidebar={handleToggleSidebar}
            />
          </div>
        </Col> */}

        <Col className='mt-3'>
          <section className="pricing-section">

            {/* <div className="div-title-pricing">
              <h2 className="title-pricing">
                {t('add-business.add')}
              </h2>
            </div> */}
            <h4 className="title-payment">Choose payment package</h4>
      <div className="pricing pricing-palden">
              {/* <div
                className="pricing-item features-item ja-animate"
                data-animation="move-from-bottom"
                data-delay="item-0"
                style={{ minHeight: 497 }}
              > */}
                {/* <div className="pricing-deco">
                  <h3 className="pricing-title">
                    {t('pricing.basic')}
                  </h3>
                  <div className="pricing-price pricing-circle">
                    ${t('pricing.free')}
                    <span className="pricing-period">/ mo</span>
                  </div>
                </div> */}
                {/* <p>{t('pricing.basic-terms')}</p>
                <br />
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
                <Button variant="outline-dark" className="btn-pricing" onClick={() => check("free")}>{t('pricing.next')}</Button>
              </div> */}

              <div
                className="pricing-item features-item ja-animate pricing__item--featured"
                data-animation="move-from-bottom"
                data-delay="item-1"
                style={{ minHeight: 497 }}
              >
                <div className="pricing-deco">
                  <h3 className="pricing-title">
                    {t('pricing.extended')}
                  </h3>
                  <div className="pricing-price pricing-circle">
                    ${t('pricing.extended-price')}
                    <span className="btn-pricing">/ mo</span>
                  </div>
                </div>
                <p>
                  {t('pricing.extended-terms')}
                </p>
                <br />
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
                <Button variant="warning" className="btn-pricing btn-color" onClick={() => check("promoted")}>
                  {t('pricing.next')}
                </Button>
              </div>

              <div
                className="pricing-item features-item ja-animate"
                data-animation="move-from-bottom"
                data-delay="item-2"
                style={{ minHeight: 497 }}
              >
                <div className="pricing-deco">
                  <h3 className="pricing-title">{t('pricing.professional')}</h3>
                  <div className="pricing-price pricing-circle">
                    ${t('pricing.professional-price')}
                    <span className="pricing-period">/ mo</span>
                  </div>
                </div>
                <p> {t('pricing.professional-terms')}</p>
                <br />
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
                <Button variant="outline-dark" className="btn-pricing" onClick={() => check("premium")} >
                  {t('pricing.next')}
                </Button>
              </div>
            </div>
          </section>
        </Col >
      </Row >
    </Container >
  );
}

