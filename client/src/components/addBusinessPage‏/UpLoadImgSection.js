import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Card, Col, Row, Button } from "react-bootstrap";

import Icon from "../utilities/Icon";

import '../../styles/addBusinessPage.css';
import '../../styles/UpLoadImgSection.css';
import ImageCompression from '../../functions/ImageCompression'


export default function UpLoadImgSection(props) {

  const editBusiness = useSelector(state => state.business.editBusiness)
  const [flag, setFlag] = useState(false)
  const [galery, setGalery] = useState({ photos: [] });
  // const [highlight, setHighlight] = useState("false");
  const { photos } = galery;
  const { galery1, setGalery1, flagOfImg } = props

  useEffect(() => {
    if (flagOfImg) {
      let arrGalery = { photos: [] }
      if (editBusiness?.userGalery && !flag) {
        editBusiness.userGalery.photos.forEach((item, i) => {
          if (i < editBusiness.userGalery.photos.length)
            if (item.img !== "") {
              arrGalery.photos.push(item)
              galery.photos.push(item)
            }
        })
        setFlag(true)
      }
      if (editBusiness?.galery) {
        editBusiness.galery.forEach(img => {
          arrGalery.photos.push(img)
        });
        setGalery(u => arrGalery);
        // myGalery(arrGalery.photos);

      }
    }
    // eslint-disable-next-line
  }, [editBusiness])


  const handleFileChange = e => {
    let files = e.target.files;
    handFiles(files)
  }

  const handFiles = async files => {
    let photosArr = galery.photos;
    for (let file of files) {
      let imgUrl = ""
      imgUrl=await ImageCompression(file)
      setGalery1(galery1.concat(imgUrl))
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        let fileObject = reader.result

        photosArr.push(fileObject);
        setGalery({
          ...galery,
          photos: [...photosArr]
        })
        // if (photos)
        //   myGalery(photosArr);
      })
    }
  };

  const handleDelete = e => {
    let photosArr = []
    let target = e.target.parentElement;
    let targetindex = target.dataset.imgindex * 1;
    setGalery({
      ...galery,
      photos: [...photos.slice(0, targetindex), ...photos.slice(targetindex + 1)]
    })
    galery.photos.forEach((element, i) => {
      if (i !== targetindex) {
        photosArr.push(element);
      }
    });
    // myGalery(photosArr);
  }

  const handleHighlight = e => {
    e.preventDefault();
    e.stopPropagation();
    // setHighlight("true");

  }
  const handleUnhighlight = e => {
    e.preventDefault();
    e.stopPropagation();
    // setHighlight("false");

  }
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    // setHighlight("false");
    let dt = e.dataTransfer;
    let files = dt.files;
    handFiles(files);
  }

  return (
    <div className='m-5'>
      <Card className="styleCardBody" >
        <Card.Body className="body-add-listing">
          <Row>
            <Col>
              <div className="context-gallery d-flex-column"
                onDragEnter={handleHighlight}
                onDragOver={handleHighlight}
                onDragLeave={handleUnhighlight}
                onDrop={handleDrop}>
                <div>
                  <Icon name="imageDownload"></Icon>
                </div>
                <p>Drop image here</p>
                <p>Or</p><br></br>
                <div id="filephotos" className='d-none'>
                  <input type="file"
                    className="btn-choose-files d-none "
                    variant="primary"
                    name="photos"
                    placeholder="Enter photos"
                    onFocus={(e) => e.currentTarget.placeholder = ''}
                    onBlur={(e) => e.currentTarget.placeholder = "Enter photos"}
                    multiple={true}

                    onChange={handleFileChange}
                  /></div>
                <Button variant="warning buttonStyle" onClick={() => document.getElementById('filephotos').children[0].click()}>Choose File</Button>
              </div>
              <div className="custom-file-preview">
                {photos.length > 0 && photos.map((item, index) => (
                  <div className="prev-img" key={index} data-imgindex={index}>
                    <span onClick={handleDelete}>×</span>
                    <img src={item.img !== undefined ? item.img : item} alt="" />
                    {item.name}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}