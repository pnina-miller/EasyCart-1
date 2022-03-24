import React,{useEffect,useRef,useState} from 'react'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import d from '../../images/food-2.png'
import '../../styles/editCatalog/OrderProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/Action'
import Counter from './counter'
import Icon from '../utilities/Icon'

import '../../styles/businessPage/catalogBusiness.css'

const OrderProduct = (props) => {
    const {product, setShow, businessId } = props
    const [count, setCount] = useState(1);
    const [intervalCounter, setintervalCounter] = useState(0)
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.currentUserDetails?._id);
    const cart = useSelector(state => state.user.cart);
    const [disableBtn, setdisableBtn] = useState(false);
    const intervalFunc = useRef(0);

    useEffect(() => {
        if (intervalCounter <= 0) {
            clearInterval(intervalFunc.current);
            intervalFunc.current = 0
            setdisableBtn(false)
        }
    }, [intervalCounter])

    const addingProduct = async () => {
        let productToOrder = await { productId: { _id: product._id, name: product.name, images: product.images, price: product.price }, count: count }
        await dispatch(actions.addProductToCart({ productToOrder, businessId }));
        let itemImg = await document.getElementsByName("imgProduct")[0]
        setintervalCounter(count);
        setdisableBtn(true)
        intervalFunc.current = setInterval(() => {
            setintervalCounter(c => c - 1);
            let cloneItem = itemImg.cloneNode(true);
            cloneItem.className += " animateImg imgResponsive deleteProducts"
            cloneItem.classList.remove("imgCoverProduct");
            cloneItem.name = "imgProductClone"
            document.getElementsByName("orderCardWrapper")[0].prepend(cloneItem);
        }, 150)
        setTimeout(() => {
            document.querySelectorAll('.deleteProducts').forEach(function (a) {
                a.remove()
            })
        }, 5000 * count)
    }

    useEffect(() => {
        saveData();
        async function saveData() {
            await dispatch(actions.saveOrder({ cart: cart, userId: userId, orderMode: "save" }))
        }
    }, [cart, dispatch, userId])



    return (
        <>
            <Container name="orderCardWrapper" className="hhh animateAdd shadow  p-5 widthStyle" >
                <Row className="">
                    <Col xs={12} md={6}><Image name="imgProduct" className="mb-5 mb-md-0 h-100 imgCoverProduct imgBorder" fluid alt='' src={product?.images ? product.images : d} /></Col>
                    <Col xs={12} md={6} className=" ml-0">
                        <div className="w-100 d-flex justify-content-end wrapper-backward">
                            <div onClick={() => { setShow(x => !x)}}>
                                <Icon name="backward" />
                            </div>
                        </div>
                        <label className="fontWeight h4 mt-4 mt-md-0">{product.name}:</label>
                        <p className="descriptionProduct fontDetails Pwidth">{product.description}</p>
                        <hr className="mt-5 mb-4" />
                        <label className="fontWeight">Quantity:</label>
                        <Counter count={count} setCount={setCount} />
                        <hr />
                        <label className="fontWeight">Price:</label>
                        <p className="fontDetails font-weight-bold"><b className="text-warning mr-1">$</b>{product.price} dollars</p>
                        <hr />
                        <label className="fontWeight">Total payment:</label>
                        <p className="fontDetails font-weight-bold"><b className="text-warning mr-1">$</b>{product.price * count} dollars</p>

                        <Button disabled={disableBtn} className="fontWeight itemCart animateAdd" variant="warning" onClick={() => { addingProduct() }}>Add to order</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderProduct;

