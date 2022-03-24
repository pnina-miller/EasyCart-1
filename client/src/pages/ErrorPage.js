import React from "react";
import { useTranslation } from "react-i18next";
import{  Container,
  Row,
  Button,
  FormControl,
  InputGroup,
  Col,
} from "react-bootstrap";

import HemletComponent from "../components/utilities/hemlet";
import Icon from "../components/utilities/Icon";
import "../styles/errorPage.css";
import Logo from "../images/logo.png";

export default function ErrorPage() {
  const { t } = useTranslation();
  const seoTitle = "404 | EasyCart";
  const seoDescription =
    "404 Page not found. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords=["Business", "EasyCart"];

  return (
    <div>
        <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />

      <Container fluid>
        <Row>
          <div className="col-md-12">
            <section id="not-found" className="center">
              <div className="p-404 d-flex justify-content-center">
                <h2>
                  404 <Icon name="questionMark" />
                </h2>
              </div>
              <p>{t("errors.page-not-found")}</p>
              <Row className="d-flex justify-content-center">
                <Col sm={9} md={6}>
                  <div className="main-search-input gray-style margin-top-50 margin-bottom-10">
                    <div className="main-search-input-item align-items-center justify-content-center">
                      <InputGroup
                        className="input-search mt-5 d-flex align-items-center"
                        size="lg"
                      >
                        <FormControl
                          className="focusNone heightSearch borderNone"
                          placeholder={t("search-section.search-placeholder")}
                          onFocus={e=>e.currentTarget.placeholder=''}
                          onBlur={e=>e.currentTarget.placeholder=t("search-section.search-placeholder")}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append className="p-2">
                          <Button
                            className="focusNone btnColor borderRadiuse f-flex"
                            variant="outline-secondary"
                          >
                            {t("search")}
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </div>
                  </div>
                  {/* <div className="main-search-input gray-style margin-top-30 margin-bottom-10">
                    <div className="main-search-input-item align-items-center justify-content-center">
                      <InputGroup
                        className="borderRadiuse mt-5 d-flex align-items-center justify-content-center"
                        size="lg"
                      >
                        <FormControl
                          className="focusNone heightSearch borderNone"
                          placeholder={t("search-section.search-placeholder")}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append className="p-2">
                          <Button
                            className="focusNone btnColor borderRadiuse"
                            variant="outline-secondary"
                          >
                            {t("search")}
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </div>
                  </div> */}
                </Col>
              </Row>
            </section>
          </div>
        </Row>
      </Container>
    </div>
  );
}
