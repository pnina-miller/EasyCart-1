//V
import React, { useEffect, useState } from "react";
import {  Container, Col, Row, Button, Table, Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import Icon from "../components/utilities/Icon";
import ProductTable from "../components/orders/productTable";
import * as moment from "moment";
import {
  getOrdersByUserId,
} from "../services/oders";

import "../styles/orderTablePage.css";

export default function UserOrdersPage(props) {
  const [orders, setOrders] = useState();
  const userId = useSelector((state) => state.user.currentUserDetails._id);

  useEffect(() => {
       getOrdersByUserId(userId).then(data=>setOrders(data));
  }, [ userId]);

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

function OrdersTable(props){
    const {orders} = props
        return(
            <Table responsive>
            <thead className="thead-style">
              <tr className="tr-style">
                <th>Order No.</th>
                <th>Cost</th>
                <th>Order Date</th>
                <th>business name</th>
                <th>phone</th>
                <th>email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item, index) => (
                  item.order?.map((item2, index2)=>
                  item2.businessId?.businessName&&   <OrderLine createdAt={item.createdAt} item={item2} index={index2} />
                  )
              ))}
            </tbody>
          </Table>
        )
    }
    
    
    function OrderLine({ item, index, createdAt }) {
      let optionsArr = [
        {
          name: "Done",
          color: "#00b69b",
          backgroundColor: "#00b69b2b",
          class: "status-option-done",
          status: 1,
        },
        {
          name: "In Progress",
          color: "#ffa756",
          backgroundColor: "#ffa7566b",
          class: "status-option-progress",
          status: 2,
        },
        {
          name: "Unqualified",
          color: "#ef3826",
          backgroundColor: "#ef382630",
          class: "status-option-unqualified",
          status: 3,
        },
        {
          name: "Connected",
          color: "#6226ef",
          backgroundColor: "#6226ef42",
          class: "status-option-connected",
          status: 4,
        },
      ];
    debugger
      const [open, setOpen] = useState(false);
      return (
        <>
          <tr className="tr-style">
            <td className="d-flex align-items-center">{index}</td>
            <td>100$</td>
            <td>{moment(createdAt).format("YYYY/MM/DD")}‏</td>
            <td>{item.businessId?.businessName}</td>
            <td>{item.businessId?.phone}</td>
            <td>{item.businessId?.email}</td>
            <td>{item.status>-1&&
        <Button
                style={{
                  color: optionsArr[item.status]?.color,
                  backgroundColor:
                    optionsArr[item.status]?.backgroundColor,
                    border:'none'
                }}
              >{optionsArr[item.status ]?.name}
              </Button>}
            </td>
            <td>
              <div
                className="iconForOpenTable"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                <Icon name="fullArrowDown"></Icon>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={7} className="pl-0 pr-0">
              <Collapse in={open}>
                <div id="example-collapse-text">
                  {item.products?.length > 0 ? (
                    <ProductTable
                      productsArr={item.products}
                    ></ProductTable>
                  ) : (
                    "no products"
                  )}
                </div>
              </Collapse>
            </td>
          </tr>
        </>
      );
    }
    