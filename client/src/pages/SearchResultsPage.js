
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import {  useParams } from "react-router-dom";

import HemletComponent from "../components/utilities/hemlet";
import SearchCategory from '../components/searchResult/SearchSection'
import Sidebar from '../components/searchResult/Sidebar'
import Footer from '../components/Footer'
import Icon from "../components/utilities/Icon";

import Logo from "../images/logo.png";


export default function SearchResultsPage() {
  const { keyword } = useParams();
  const seoTitle = `${keyword} Results | EasyCart`;
  const seoDescription =
    "Search Results description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords=["Business", "EasyCart"];

  const [show, SetShow] = useState(false);
  const executeScroll = () => {
    scrollUp.current.scrollIntoView({
      behavior: "smooth",
    })
  }
  window.onscroll = () => {
    window.pageYOffset > 553 ? SetShow(true) : SetShow(false) 
  }
  const scrollUp = useRef(null)

useEffect(()=>{

},[])
  return (
    <>
      <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />

      <div ref={scrollUp}></div>
      <Container fluid className="main-container">
          <section className="categories-section mt-6">
            <SearchCategory></SearchCategory>
          </section>
          <aside>
            <Sidebar />
          </aside>
            <button style={{position:'fixed',bottom:'0',right:'0',zIndex:'4'}} className={`arrow-up-container ${show === true ? 'd-block' : 'd-none'}`} onClick={executeScroll}>
            <Icon name="arrowUp" />
            </button>

          <Footer />
        </Container>
    </>
  );
}