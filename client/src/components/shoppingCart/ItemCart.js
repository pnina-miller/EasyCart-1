import React from "react";
import Icon from "../utilities/Icon";

import "../../styles/shoppingCart.css";

function ItemCart(props) {
  const { product, removeProduct, increment, decrement, count } = props;

  return (
    <>
      {product ?
        <div className="item-in-cartPanel" key={product._id}>
          <div className="wrapper-img-cartPanel">
            <img alt='' src={product.images}></img>
          </div>
          <div className="item-description-cartPanel">{product.name}</div>
          <div className="count-wrapper d-flex">
            <button
              className="Decrement"
              onClick={() => decrement(product._id)}
            >
              -
            </button>
            <div className="count-product">{count}</div>
            <button
              className="Increment"
              onClick={() => increment(product._id)}
            >
              +
            </button>
          </div>
          <div className="item-price-cartPanel">{product.price}</div>
          <div
            className="wrapper-remove-icon wrapper-trash"
            onClick={() => removeProduct(product._id)}
          >
            <Icon name="trash" />
          </div>
        </div>
        :
        "error product undefind"
      }
    </>
  );
}


export default ItemCart