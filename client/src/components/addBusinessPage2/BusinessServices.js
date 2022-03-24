import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { Form, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { businessDetailesSrvice2 } from "../../services/business";

function BusinessServices(props) {
    const { business, setBusiness } = props
    const { keyWord } = useParams();
    const [CheckedBusinessDetails, setCheckedBusinessDetails] = useState();
    const [servicesOptions, setServicesOptions] = useState();
    const [valueService, setvalueService] = useState([]);
    useEffect(() => {
        keyWord && businessDetailesSrvice2(keyWord)
            .then(result => {
                setCheckedBusinessDetails(result)
            })
    }, [keyWord]);

    useEffect(() => {
        let serviceArr = []
        CheckedBusinessDetails?.service?.forEach((service) => {
            serviceArr.push({ value: service.name, label: service.name });
        });
        setvalueService(serviceArr)
    }, [CheckedBusinessDetails])
    
    useEffect(() => {
        axios({
            method: "get",
            url: "/service/getAllServices"
        }).then(function (response) {
            let services = [];
            response.data?.forEach((service) => {
                services.push({ value: service.name, label: service.name, __isNew__: service.__isNew__ });
            });
            setServicesOptions(services);
        })
            .catch((err) => {
                console.error('error', err);
            });
    }, [])


    const handleChange = (newValue, actionMeta) => {
        setvalueService(newValue);
        setBusiness({ ...business, service: newValue })
    };
    
    return (
        <Container className="pl-5" >
            <Row>
                <Col xs={12} >
                    <Form.Group
                        controlId="formBasicEmail"
                        className="form-group-product"
                    >
                        {/* <Form.Label className="lable-in-form">service</Form.Label> */}
                        <CreatableSelect
                            isMulti
                            onChange={handleChange}
                            options={servicesOptions}
                            value={valueService}
                            className="w-100 bgColorWhite "
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Container>

    );
}
export default BusinessServices;