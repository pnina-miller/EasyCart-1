
import {  Table } from "react-bootstrap";
import OrderLine from './orderLine'

function OrdersTable(props){
const {orders} = props
    return(
        <Table responsive>
        <thead className="thead-style">
          <tr className="tr-style">
            <th>Order No.</th>
            <th>Cost</th>
            <th>Order Date</th>
            <th>customer name</th>
            <th>phone</th>
            <th>email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <OrderLine item={item} index={index} />
          ))}
        </tbody>
      </Table>
    )
}

export default OrdersTable