import React, { useState } from "react";
import { Form, Collapse } from "react-bootstrap";
import * as moment from "moment";

import Icon from "../utilities/Icon";
import ProductTable from "./productTable";

function OrderLine({ item, index }) {
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
    const changeColor = (e) => {
      let index = e.target.selectedIndex;
      e.target.style.color = optionsArr[index].color;
      e.target.style.backgroundColor = optionsArr[index].backgroundColor;
    };
  
    const [open, setOpen] = useState(false);
    return (
      <>
        <tr className="tr-style">
          <td className="d-flex align-items-center">{index}</td>
          <td>100$</td>
          <td>{moment(item.order.createdAt).format("YYYY/MM/DD")}‏</td>
          <td>{item.userId?.userName}</td>
          <td>{item.userId?.phone}</td>
          <td>{item.userId?.email}</td>
          <td>
            <Form.Control
              id={`selectRow${index}`}
              className="select-style firstSelected"
              as="select"
              onChange={(e) => changeColor(e)}
              style={{
                color: optionsArr[item.order[0].status - 1]?.color,
                backgroundColor:
                  optionsArr[item.order[0].status - 1]?.backgroundColor,
              }}
            >
              {optionsArr.map((o, index) => (
                <option
                  selected={o.status === item.order[0].status}
                  className="option-style"
                >
                  {o.name}
                </option>
              ))}
            </Form.Control>
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
                {item.order[0]?.products?.length > 0 ? (
                  <ProductTable
                    productsArr={item.order[0].products}
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
export default OrderLine  