import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Carousel
} from 'react-bootstrap'

import "./stylePages.css"

import NavBar from '../component/navbar'
import NavLogin from '../component/navlogin'
import CardProduct from '../component/card'

import Footer from '../component/footer'
const url = 'https://shoes-db.herokuapp.com'

export default function HomePage() {
    const state = useSelector((state) => state.userReducer)

    const [carouselImg, setCarouselImg] = useState([])
    const [products, setProducts] = useState([])

    // pagination
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)

    let prodPerPage = 4
    let startCard = (page - 1) * prodPerPage
    let sliceCard = products.slice(startCard, startCard + prodPerPage)

    useEffect(() => {
        Axios.get(`${url}/products`)
            .then(res => {
                setProducts(res.data)
                setMaxPage(Math.ceil(res.data.length / prodPerPage))
            })
        Axios.get(`${url}/slider`)
            .then(res => {
                setCarouselImg(res.data)
            })
    }, [prodPerPage])

    const onNext = () => {
        setPage(page + 1)
    }
    const onPrev = () => {
        setPage(page - 1)
    }

    return (
        <div>
            <NavLogin />
            <NavBar />
            <div className="home-bg text-front-bg img-front">
                <div className="img-front p-0">
                    <div>SHOES PRODUCT</div>
                    <div className="p-img-front"><p>Lorem ipsum dolor sit amet</p></div>
                </div>
            </div>

            <div className="bg-gradient-all">

                <Container>
                    <Row className="my-2 px-2">
                        <Col className="search-bar-style">
                            <Col lg={3} sm={3} className="search-bar-icon">
                                <i className="fa-solid fa-filter px-2"></i> Filters
                                <i className="fa-solid fa-sort-down px-2"></i>
                            </Col>
                            <Col lg={6} sm={6} className="search-bar-icon">
                                <input className="login-input" style={{ width: "100%" }} placeholder="Search" />
                                <button className="btn-style-3"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </Col>
                            <Col lg={{ span: 2, offset: 1 }} sm={3} className="search-bar-icon">
                                {state.role === "admin" ?
                                    <Link as={Link} to="/historyadmin">
                                        <button className="btn-style-3"><i className="fa-solid fa-heart-circle-plus px-2"></i></button>
                                    </Link>
                                    :
                                    <>
                                        <Link as={Link} to="/history">
                                            <button className="btn-style-3"><i className="fa-solid fa-heart-circle-plus px-2"></i></button>
                                        </Link>
                                        <Link as={Link} to="/cart">
                                            <button className="btn-style-3"><i className="fa-solid fa-cart-shopping px-2"></i></button>
                                        </Link>
                                    </>
                                }
                            </Col>
                        </Col>
                    </Row>

                    <Row >
                        {/* LEFT SIDE */}
                        <Col lg={{ span: 3, order: 0 }} sm={{ span: 12, order: 1 }} className="p-2">
                            <Row >
                                <Col lg={12} sm={6} className="ls-category my-2">
                                    <Col className="ls-category-text">CATEGORY</Col>
                                    <Col className="ls-category-text">Shoes</Col>
                                    <Col className="ls-category-text">Watches</Col>
                                    <Col className="ls-category-text">Cloth</Col>
                                    <Col className="ls-category-text">Hat</Col>
                                    <Col className="ls-category-text">Glasses</Col>
                                </Col>

                                <Col lg={12} sm={6} >
                                    <img className="img-ads my-2" src="https://i.pinimg.com/564x/07/0b/d4/070bd4a070f802ae7a2c8a6b3566fd2a.jpg" alt="img-ads" />
                                </Col>
                            </Row>

                            <Col lg={12} sm={12} className="ls-category mt-3 p-0 pe-3">
                                <Col className="ls-category-text">LATEST PRODUCT</Col>
                                <Col>
                                    <div className="ls-history p-2">
                                        <div style={{ width: "35%" }}>
                                            <img className="img-history" src="https://i.pinimg.com/564x/ac/02/3c/ac023c999ff3492f76e0c0b7c9598106.jpg" alt="history-img" />
                                        </div>
                                        <div style={{ width: "65%" }} className="ls-history-product">
                                            <div>NAME PRODUCT</div>
                                            <div>IDR : Rp 1.000.000</div>
                                            <div style={{ fontSize: "12px" }}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                                        </div>
                                    </div>
                                </Col>
                            </Col>

                        </Col>

                        {/* RIGHT SIDE */}
                        <Col lg={9} className="p-2">
                            <Col lg={12}>
                                <Row>
                                    <Carousel>
                                        {carouselImg.map((item, index) =>
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100 carousel-img"
                                                    src={item.img}
                                                    alt="First slide"
                                                    style={{ height: "50vh" }}
                                                    key={item.id}
                                                />
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                </Row>
                            </Col>

                            <Col lg={12} className="rs-title mb-0">
                                BEST DEAL TODAY
                            </Col>
                            <Row className="mt-3">
                                <Col className="col-lg-6 col-sm-6">
                                    <Carousel>
                                        {carouselImg.map((item, index) =>
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100 carousel-img"
                                                    src={item.img}
                                                    alt="First slide"
                                                    style={{ height: "20vh" }}
                                                    key={item.id}
                                                />
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                </Col>

                                <Col className="col-lg-6 col-sm-6">
                                    <Carousel>
                                        {carouselImg.map((item, index) =>
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100 carousel-img"
                                                    src={item.img}
                                                    alt="First slide"
                                                    style={{ height: "20vh" }}
                                                    key={item.id}
                                                />
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                </Col>
                            </Row>

                            <Col lg={12} className="rs-title">
                                BEST PRODUCTS
                            </Col>

                            <Col lg={12} className="p-0 m-0">
                                <Col lg={12} className="container-card m-0 p-0">
                                    {sliceCard.map((item) =>
                                        <CardProduct
                                            data={item}
                                            key={item.id}
                                        />
                                    )}
                                </Col>
                                <div className="pagination-product my-4">
                                    <button className="btn-style mx-3" onClick={onPrev} disabled={page === 1 ? true : false}>Prev</button>
                                    <label>Page {page}/{maxPage} </label>
                                    <button className="btn-style mx-3" onClick={onNext} disabled={page === maxPage ? true : false}>Next</button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}