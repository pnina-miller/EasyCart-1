//V
import React, { useEffect, useState } from "react";
import {  Container, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import Icon from "../components/utilities/Icon";
import OrdersTable from "../components/orders/ordersTable";
import {
  getOrdersByUserId,
  getOrdersByBusinessKeyWords
} from "../services/oders";

import "../styles/orderTablePage.css";

export default function OrdersPage(props) {
  let { name } = useParams();
  const [orders, setOrders] = useState();
  const userId = useSelector((state) => state.user.currentUserDetails._id);

  useEffect(() => {
    async function fetchData(){
    setOrders()
    if (name) setOrders(await getOrdersByBusinessKeyWords(name));
    else userId && setOrders(await getOrdersByUserId(userId));
    }
    fetchData();
  }, [name, userId]);

  return (
    <>
      <Container fluid className="mt-5 container-table">
        <Row>
          <Col className="wrapper" p- xs={12}>
            <Container fluid className="container-child p-1 mb-5">
              <Row>
                <Col xs={6} className="col-underline pt-5">
                  <div className="d-flex pl-5 pr-5">
                    <h3 className="pl-5">Orders</h3>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="form-search">
                    <input
                      type="search"
                      className="search-input"
                      placeholder="Search"
                    />
                    <div className="search-div">
                      <Icon name="search"></Icon>
                    </div>
                  </div>
                </Col>
                {/* <hr className="underline-order"></hr> */}
              </Row>
              <div className="table-order">
                {orders ? (
                  orders?.length > 0 ? (
                   <OrdersTable orders={orders}/>
                  ) : (
                    <h1>no resultes</h1>
                  )
                ) : (
                  <Skeleton
                    count={60}
                    style={{
                      margin: "10px",
                      width: "100%",
                      height: "70px",
                      borderRadius: "5%",
                    }}
                  />
                )}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}


