import React, { cloneElement, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";



export default function BusinessAreaPage(props) {
    const { children } = props

    const businessUesers = useSelector(state => state.user?.currentUserDetails?.business);

    const [chosenBusiness, setChosenBusiness] = useState()

    useEffect(() => { businessUesers && setChosenBusiness(businessUesers[0]?._id)}, [businessUesers])
    
    return ( <Container fluid style={{ 'margin-top': '60px' }} >
    <Row>
      <Col xs={12} className='d-flex justify-content-center'>
            <div className="d-flex w-100">
                <Container>
                    <Row>
                        {chosenBusiness && <Tabs style={{ backgroundColor: 'black' }} defaultActiveKey={chosenBusiness} id="uncontrolled-tab-example" onSelect={b => setChosenBusiness(b)}>
                            {businessUesers?.map((business, i) =>
                                <Tab
                                    tabClassName='dashboard-tab'
                                    eventKey={business._id}
                                    title={business.businessName}>
                                    {cloneElement(children, { currentBusiness: business._id })}
                                </Tab>
                            )}
                        </Tabs>}
                    </Row>
                </Container>
            </div></Col>
       </Row>
       </Container>)
}