import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { actions } from "../../redux/Action";
import ItemCart from "./ItemCart";
import Icon from "../utilities/Icon";

import "../../styles/shoppingCart.css";
import { Container, Row, Col } from "react-bootstrap";



function ShoppingCart(props) {

  const { scrollCart } = props
  const dispatch = useDispatch()

  const [total, setTotal] = useState(0)
  let cart = useSelector(state => state.user.cart);
  let userId = useSelector(state => state.user.currentUserDetails?._id)

  function setCart(newCart) {
    cart = newCart;
    dispatch(actions.setCart(newCart))
  }


  useEffect(() => {
    let total =
      cart?.map(c => {
        return (
          c.products?.reduce((prev, item) => {
            return prev + (item?.count * item?.productId?.price)
          }, 0))
      })
    setTotal(total)

  }, [cart])


  const increment = async (id) => {
    const c = cart.map(element => {
      return {
        businessId: element.businessId,
        products: element?.products.map(productItem => {
          let item = productItem.productId
          return {
            count: item._id === id ? productItem.count + 1 : productItem.count,
            productId: {
              _id: item._id,
              name: item.name,
              price: item.price,
              img: item.img,
              status: item.status
            }
          }
        })
      }
    })
    await setCart(c)
    await dispatch(actions.saveOrder({ cart: cart, userId: userId, orderMode: "save" }))
  }

  const decrement = async (id) => {
    const c = cart.map(element => {
      return {
        businessId: element.businessId,
        products: element?.products.map(productItem => {
          let item = productItem.productId
          console.log("item decrement",item);
          return {
            count: item._id === id && productItem.count > 0 ? productItem.count - 1 : productItem.count,
            productId: {
              _id: item._id,
              name: item.name,
              price: item.price,
              img: item.img,
              status: item.status
            }
          }
        })
      }
    })
    await setCart(c)
    await dispatch(actions.saveOrder({ cart: cart, userId: userId, orderMode: "save" }))

  }

  const removeProduct = async (id) => {
    let c;
    if (window.confirm("Do you want to delete this product?")) {
      c = cart.map(element => {
        return {
          businessId: element.businessId,
          products: element.products.filter(p => p.productId._id !== id)
        }
      })
    }
    await setCart(c)
    await dispatch(actions.saveOrder({ cart: cart, userId: userId, orderMode: "save" }))
    alert("remove product successfully")
  }

  const buyOrder = async () => {
    await dispatch(actions.saveOrder({ cart: cart, userId: userId, orderMode: 'buy' }))
    await setCart([])
    alert("thank you for your buying")
  }

  if (!cart || cart.length === 0)
    return <>
      <div className="cartPanel-container d-flex align-items-center justify-content-center emptyCart" >
        <div className="onlyProduct" >
          <Icon name="emptyCart" />
          <h5 className="text-center text-secondary h-5 mt-4" >Your cart is Empty</h5>
        </div></div>
    </>


  return (
    <>





      <Container className="cartPanel-container d-flex flex-column justify-content-end" >
        <Row className="w-100">
          <Col>
            <div className={scrollCart===false ? "onlyProduct  cancelScrollList":"onlyProduct"}>
              {
                cart?.map((item) =>
                  item.products?.map((element, index) =>
                    <ItemCart key={index} product={element.productId} count={element.count} removeProduct={removeProduct} decrement={decrement} increment={increment} />
                  )
                )
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="container-total-cartPnael d-flex flex-column justify-content-between align-items-center " >
              <div className="total-and-delivery">
                <div className="wrapper-total-cartPanel d-flex justify-content-between">
                  <p className="cartTotal"> Total: </p>
                  <div>{total}</div>
                </div>
                <div className="delivery-cartPanel">Excluding Standard Delivery (Normally $10.00)</div></div>
              <div className="d-flex justify-content-between wrapper-btn-cartPanel">
                <Link to='ShoppingCart' > <button className="btnCartTotal" >view/edit bag</button></Link>
                <button className="btnCartTotal" onClick={() => window.open('https://pay.leader.codes/yaek@leader.codes/TranzilaIframe?sum=' + total)}>checkout</button>
                <button className="btnCartTotal" onClick={() => buyOrder()}>buy</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>


      {/* <div className="cartPanel-container d-flex flex-column justify-content-end" style={{ marginLeft: "-23vw" }}>
        <div className="onlyProduct">
          {
            cart?.map((item) =>
              item.products?.map((element, index) =>
                <ItemCart key={index} product={element.productId} count={element.count} removeProduct={removeProduct} decrement={decrement} increment={increment} />
              )
            )
          }
        </div>
        <div className="container-total-cartPnael d-flex flex-column justify-content-between align-items-center " >
          <div className="total-and-delivery">
            <div className="wrapper-total-cartPanel d-flex justify-content-between">
              <p className="cartTotal"> Total: </p>
              <div>{total}</div>
            </div>
            <div className="delivery-cartPanel">Excluding Standard Delivery (Normally $10.00)</div></div>
          <div className="d-flex justify-content-between wrapper-btn-cartPanel">
            <Link to='ShoppingCart' > <button className="btnCartTotal" >view/edit bag</button></Link>
            <button className="btnCartTotal" onClick={() => window.open('https://pay.leader.codes/yaek@leader.codes/TranzilaIframe?sum=' + total)}>checkout</button>
          </div>
          <button className="btnCartTotal" onClick={() => buyOrder()}>buy</button>
        </div>
      </div> */}
    </>
  );
}

export default ShoppingCart