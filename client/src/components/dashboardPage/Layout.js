// import BusinessAreaPage from '../BusinessAreaPage';
import { Container, Row, Col } from "react-bootstrap"
import React, { useState } from 'react';

import Main from './Main';

import "../../styles/dashboardPage/aside.css";

function Layout() {

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => setCollapsed(checked);

  const handleToggleSidebar = (value) => setToggled(value);

  return (
    <>
    
      <Container fluid className="h-container" >
        <Row>
          <Col xs={12} className='d-flex justify-content-center'>

            {/* <BusinessAreaPage> */}
              <Main
                toggled={toggled}
                collapsed={collapsed}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
              />
              {/* </BusinessAreaPage> */}

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Layout;
