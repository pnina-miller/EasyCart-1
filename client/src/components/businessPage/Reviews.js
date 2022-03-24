import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

import UserRecommendation from '../../components/businessPage/UserRecommendation';

function Reviews (){
      let businessId = '6075747eb57c4a17fc24f633'

    return (<>
        <Container fluid style={{ backgroundColor: "white" }} className='mt-5'>
            <Row>
                <Col xs={12} className='pt-5'><h3 className='pl-4'>Reviews</h3>
                    {/* <div ><hr className='underlineProfile'></hr></div> */}
                </Col>
            </Row >
        </Container>
        <UserRecommendation businessId={businessId} edit={true}></UserRecommendation>

    </>
    )
}

export default Reviews
