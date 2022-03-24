import React from "react";
import { Table } from "react-bootstrap";
import * as moment from "moment";

import "../../styles/productTablePage.css";


 function ProductTable(props) {
  const { productsArr } = props;

  return (
    <>
      <Table responsive className="tbl-product">
        <thead className="thead-style-product">
          <tr className="tr-style-product ">
            <th className="d-flex">IMAGE</th>
            <th>PRICE PER UNIT</th>
            <th>QUNTITY</th>
            <th>DELIVERY DAY</th>
            <th>DELIVERY TIME</th>

          </tr>
        </thead>
        <tbody className="tbody-product">
          {productsArr.map((item, index) =>
            item.productId && <tr key={`orderRow${index}`}>
              <td><img src={item.productId.images} alt='' className="img-product" /></td>
              <td>{item.productId.price}$</td>
              <td>{item.count}</td>
              <td>{moment(item.productId.createdAt).format("YYYY/MM/DD")}</td>
              <td>{moment(item.productId.createdAt).format("hh:mm:ss")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default ProductTable;