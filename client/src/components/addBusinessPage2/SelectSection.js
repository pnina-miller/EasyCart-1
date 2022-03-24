

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as cloneDeep from "lodash/cloneDeep";
import {
    Form, Container
} from "react-bootstrap";
import Select from "react-select";


import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/addBusinessPage.css";
import "../../styles/AddBusiness2/addbusiness2.css";

function SelectSection(props) {

    const { Business, setBusiness, arrSubCategoriesAdded, setArrSubCategoriesAdded } = props;

    ///Do not delete, for the next version
    //   const [sum, setSum] = useState("");
    const location = useLocation();
    const subCategories = useSelector((state) => state.category.subCategories);
    const [subCategoriesArr, setSubCategoriesArr] = useState([]);
    ///Do not delete, for the next version
    // const [showAlert, setShowAlert] = useState(false);
    const [flag, setFlag] = useState(false);




    useEffect(() => window.scrollTo(0, 0), [location])

    useEffect(() => {
        if (subCategories.length > 0 && flag === false) {
            let categoriesarr = cloneDeep(subCategoriesArr);
            subCategories.forEach((element) => {
                categoriesarr.push({ value: element._id, label: element.categoryName });
            });
            setSubCategoriesArr((u) => categoriesarr);
            categoriesarr.sort(function (a, b) {
                if (a.label.toUpperCase() < b.label.toUpperCase()) { return -1; }
                if (a.label.toUpperCase() > b.label.toUpperCase()) { return 1; }
                return 0;
            })
            setFlag(true);
        }
        // eslint-disable-next-line
    }, [subCategories]);


    const handleChange = (categoryName) => {
        ///Do not delete, for the next version
        // if (categoryName.length <= sum) {
        // if (!showAlert || categoryName.length <= sum) {
        let arrCategories = [];

        categoryName.map((item, i) => (
            <div key={i}>{arrCategories.push(item.value)}</div>
        ));
        setArrSubCategoriesAdded((c) => categoryName);
        setBusiness({ ...Business, category: arrCategories });

        ///Do not delete, for the next version
        // if (arrCategories.length === sum) {
        // setShowAlert(true)
        // }
        // }
    };
    return (
        <Container className="container-fluid ">
            <Form.Group className="w-100 pr-5 pl-5 group-select-category  position-relative m-0 p-0">
                <Form.Label className="listing-lable">
                    Category
                </Form.Label>

                {/* ///Do not delete, for the next version */}
                {/* {showAlert &&
            <Form.Label className="listing-lable">
              &nbsp; More Categories For Your Business??
              <Link onClick={() => { localStorage.setItem('Business', JSON.stringify(Business)); }} to="/pricing-business">Choose payment package</Link>
            </Form.Label>
            } */}

                <Select
                    className="form-control select select-details mb-5 categoryStyle w-100"
                    closeMenuOnSelect={true}
                    options={subCategoriesArr.length > 0 ? subCategoriesArr : ""}
                    value={arrSubCategoriesAdded.length > 0 && arrSubCategoriesAdded}
                    isMulti
                    onChange={(e) => { handleChange(e) }}
                />
            </Form.Group>

        </Container>
    );
}
export default SelectSection;