import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import BasicDetailsSection2 from "./BasicDetailsSection2";
import OpeningHoursSection from "./OpeningHoursSection";

import "../../styles/addBusinessPage.css";

function BasicDetail(props) {

    const { subCategoriesArrEdit, setArrSubCategoriesAdded,
        arrSubCategoriesAdded, Business, setBusiness } = props;
    const location = useLocation();

    useEffect(() => window.scrollTo(0, 0), [location])

    return (
        <div className="com-basic-details bg-color-edit">
            <Container>
                <BasicDetailsSection2
                    className=" d-flex justify-content-center "
                    Business={Business}
                    setBusiness={setBusiness}
                    subCategoriesArrEdit={subCategoriesArrEdit}
                    setArrSubCategoriesAdded={setArrSubCategoriesAdded}
                    arrSubCategoriesAdded={arrSubCategoriesAdded}
                ></BasicDetailsSection2>

                <OpeningHoursSection
                    className="d-flex justify-content-center "
                    Business={Business}
                    setBusiness={setBusiness}></OpeningHoursSection>

                {/* <PromotionBusiness
                    Business={Business}
                    setBusiness={setBusiness}
                ></PromotionBusiness> */}
            </Container>
        </div>
    );
}

export default BasicDetail