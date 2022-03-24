import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";


import { actions } from '../../redux/Action'
import ProductCard from '../editCatalog/ProductCard'
import SecondProductCard from '../editCatalog/SecondProductCard'
import OrderCard from './OrderProduct'

import '../../styles/businessPage/catalogBusiness.css'

function CatalogBusiness(props) {
    const { edit, storeId, businessId } = props
    const dispatch = useDispatch();
    // let storeId = useSelector(state => state.businessStore.store._id)
    let categoriesBusiness = undefined;
    categoriesBusiness = useSelector((state) => state.businessStore.allCategories.categories);
    let productCatalog = useSelector((state) => state.businessStore.store);

    const [countCard, /*setCaountCard*/] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false)
    const [product, setProduct] = useState(false)
    const [showSkeleton, setshowSkeleton] = useState(true)
    const [chosenCategory, setchosenCategory] = useState('')

    useEffect(() => storeId && dispatch(actions.getBusinessStore(storeId)), [storeId, dispatch])

    useEffect(() => {

        dispatch(actions.getAllCategories(storeId));
        // if (categoriesBusiness?.length > 0 && edit !== true && btnAll.current)
        //     btnAll.current.style.borderColor = "#F2BB27"
        // eslint-disable-next-line
    }, [storeId])

    useEffect(() => {
        //array.length is never undefined
        if (productCatalog['product']?.length === undefined || productCatalog['product']?.length <= 0) {
            setTimeout(() => {
                setshowSkeleton(false)
            }, 3000)
        }
        // eslint-disable-next-line
    }, [categoriesBusiness, productCatalog])

    useEffect(() => {
        if (productCatalog['product']?.length > 0)
            setchosenCategory('all')
            
            // eslint-disable-next-line
    }, [productCatalog])

    useEffect(() => {
        if (chosenCategory === "all") {
            setShow(false)
            setFlag(true)
            setFilteredProducts(x => [...productCatalog['product']])
        }
        else {
            filterProduct();
        }
        // eslint-disable-next-line
    }, [chosenCategory])


    const orderProduct = (product) => {
        setShow(true)
        setProduct(product)
    }

    const filterProduct = async () => {
        setShow(false)
        setFlag(true)
        setFilteredProducts([]);
        await productCatalog['product']?.forEach(productItem => {
            productItem.category?.forEach(c => {
                if (c._id === chosenCategory) {
                    setFilteredProducts(x => [...x, productItem])
                }
            })
        })
    }

    useEffect(() => {
        loadingShow()
    }, [])

    const loadingShow = () => {
        for (let index = 0; index < 5; index++)
            return <Col>
                <Card className="ProductCard">
                    <Card.Body className="card-body-ProductCard">
                        <Skeleton
                            className="w-100 h-100 skelatonStyleCard"
                        />
                    </Card.Body>
                </Card>
            </Col>
    }
    console.log("jjjjjjjjjjjjjjjjjjjjj", productCatalog['product'])
    console.log("categoriesBusiness", categoriesBusiness)
    return (
        <>
            {/* subheading */}
            <div className={showSkeleton || categoriesBusiness?.length > 0 ? "" : "d-none"}>
                <hr className="underline"></hr>
                <div className="subText font-weight-bold text-secondary pl-5 mt-4">
                    <h3>Our catalog</h3>
                </div>
                {edit !== true &&
                    <div>
                        <div className='iconsPosition d-flex justify-content-end'>
                            {/* <div type="button" onClick={() => { setCaountCard(0) }} ><Icon name="menu" ></Icon></div>
                            <div type="button" onClick={() => { setCaountCard(1) }} className='ml-2'><Icon name="list"></Icon></div> */}
                        </div>
                    </div>
                }
            </div>
            {categoriesBusiness !== undefined && categoriesBusiness.length > 0 ?
                <>
                    <Container className="w-100">
                        <Row className={categoriesBusiness.length <= 0 ? "d-none" : "d-block"}>
                            <Col>
                                <Button className={chosenCategory === 'all' ? "mt-4 mb-3 mr-2 text-secondary changeHover choosen-btn" : "mt-4 mb-3 mr-2 text-secondary changeHover"} id='all' onClick={(e) => setchosenCategory(e.target.id)} variant="outline-warning">All</Button>
                                {edit !== true &&
                                    categoriesBusiness?.map((category, index) => {
                                        return (
                                            <Button key={`categoryBtn${index}`} className={chosenCategory === category._id ? "mt-4 mb-3 mr-2 text-secondary changeHover choosen-btn" : "mt-4 mb-3 mr-2 text-secondary changeHover"} id={category._id} variant="outline-warning" onClick={(e) => setchosenCategory(e.target.id)} >{category.name}</Button>)
                                    })
                                }
                            </Col>
                        </Row>
                        <Row className='catalogRow' >
                            {show === false ?
                                flag ?
                                    filteredProducts?.map((product, index) => {
                                        if (countCard === 0)
                                            return (
                                                <Col key={`filter1${index}`} onClick={() => orderProduct(product)} xs={12} lg={4} md={6} className='catalog-card-col' >
                                                    <ProductCard product={product} update={edit} delivery={productCatalog['productCatalog']} />
                                                </Col>)
                                        else
                                            return (
                                                <Col key={`filter2${index}`} onClick={() => orderProduct(product)} xs={12} lg={6} md={6}>
                                                    <SecondProductCard product={product} delivery={productCatalog['productCatalog']} />
                                                </Col>)
                                    }) :
                                    productCatalog['product']?.map((product, index) => {
                                        if (countCard === 0)
                                            return (
                                                <Col key={`catalog1${index}`} SecondProductCard onClick={() => orderProduct(product)} xs={12} lg={4} md={6}>
                                                    <ProductCard product={product} update={edit} delivery={productCatalog['productCatalog']} />
                                                </Col>)
                                        else
                                            return (
                                                <Col key={`catalog2${index}`} onClick={() => orderProduct(product)} xs={12} lg={6} md={6}>
                                                    <SecondProductCard product={product} delivery={productCatalog['productCatalog']} />
                                                </Col>)
                                    }) :
                                <OrderCard setShow={setShow} businessId={businessId} product={product}></OrderCard>
                            }
                        </Row>
                    </Container>
                </>
                :
                <>
                    {showSkeleton &&
                        <>
                            <Row>
                                <Col className="d-flex justify-content-start">
                                    {
                                        Array.from({ length: 4 }, (item, index) =>
                                            <Skeleton className="mt-4 mb-3 mr-2 btn widthSkelaton" />
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row>
                                {
                                    Array.from({ length: 6 }, (item, index) =>
                                        <Col xs={12} lg={4} md={6} key={index}>
                                            <Card className="ProductCard">
                                                <Card.Body className="card-body-ProductCard">
                                                    <Skeleton
                                                        className="w-100 h-100 skelatonStyleCard"
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )}
                            </Row>
                        </>}
                </>}
        </>

    )
}

export default CatalogBusiness

