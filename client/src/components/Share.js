import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { keyframes } from 'styled-components';
import { slideInUp, slideInDown } from 'react-animations';
import { Modal } from 'react-bootstrap';
import { isMobile } from '../functions/isMobile';
import CopyToClipboard from './CopyToClipboard';
import QrCode from './QrCode';
import'../styles/share/share.css'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

const slideInAnimation = keyframes`${slideInUp}`;
const slideInDownAnimation = keyframes`${slideInDown}`;
 const DivQrCode = styled.span`
@media (max-width:600px){
    display: none;
}
`
const ModalDiv = styled(Modal)`
animation: ${slideInDownAnimation} 0.5s;
@media (max-width: 600px) {
    animation: ${slideInAnimation} 0.5s;
    } 
}
`
const Share = (props) => {
    
    const iconShareSize = 45;
    const shareTexts ="share";


    const { url, title } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(function () {
        if (url === '') {
            console.error("Please enter URL.");
            handleClose();
            return;
        }
        // eslint-disable-next-line
    }, [show]);

    const handleShowForMobile=()=>{
        if (navigator.share) {
            navigator
              .share({
                title: shareTexts.shareLink,
                text: shareTexts.shareLink,
                url: url,
              })
              .then(() => {
              })
              .catch(error => {
                console.error('Something went wrong sharing the blog', error);
              });
          }
    }

    return (
        <>
            {/* the button icon */}
            <div onClick={!isMobile()? handleShow : handleShowForMobile}>
                {props.children}
            </div>

            <ModalDiv centered show={show} onHide={handleClose} animation={false} >
                {/* <div/> */}
                
            
                <Modal.Header
                    closeButton
                    className='HeaderCancel'
/>
                <Modal.Body
                className='ModalBody'
                 >
                    <div>Share</div>
                    <hr></hr>
                    <div 
                    className='UrlDetailsWrap'
                    >
                        <input
                            type="url"
                            value={url}
                            className="css-input-important InputUrl "
                            disabled
                        />
                        <div
                        className='CopyAndQrWrap'
                          >
                            <CopyToClipboard
                                url={url}
                                shareTexts={shareTexts}
                            />
                            <DivQrCode
                            className='DivQrCodeStyle'
                                >
                                <QrCode
                                    url={url}
                                    shareTexts={shareTexts}
                                />
                            </DivQrCode>
                        </div>
                    </div>
                    <div
                    className="ShaerWrapButtons"
                    >
                        <div
                          className="ShaerButtonsColum"
                            // css={ShaerButtonsColum}
                            // style={ShaerButtonsColumStyle}
                        >
                            <LinkedinShareButton url={url} title={title}>
                                <LinkedinIcon
                                    bgStyle={{ fill: '#D51277' }}
                                    size={iconShareSize}
                                    borderRadius='5px' />
                            </LinkedinShareButton>
                            &nbsp;&nbsp;
                            <FacebookShareButton url={url} title={title}>
                                <FacebookIcon
                                    size={iconShareSize}
                                    borderRadius='5px'
                                />
                            </FacebookShareButton>
                            &nbsp;&nbsp;
                            <WhatsappShareButton url={url} title={title}>
                                <WhatsappIcon
                                    size={iconShareSize}
                                    borderRadius='5px' />
                            </WhatsappShareButton>
                            &nbsp;&nbsp;
                        </div>

                        <div
                          className='ShaerButtonsColum'
                        >
                            <TelegramShareButton url={url} title={title}>
                                <TelegramIcon
                                    size={iconShareSize}
                                    borderRadius='5px' />
                            </TelegramShareButton>
                            &nbsp;&nbsp;
                            <TwitterShareButton url={url} title={title}>
                                <TwitterIcon
                                    bgStyle={{ fill: '#8fd1ed' }}
                                    size={iconShareSize}
                                    borderRadius='5px' />
                            </TwitterShareButton>
                            &nbsp;&nbsp;

                            <EmailShareButton url={url} subject={title}>
                                <EmailIcon
                                    bgStyle={{ fill: 'red' }}
                                    size={iconShareSize}
                                    borderRadius='5px' />
                            </EmailShareButton>
                            &nbsp;&nbsp;
                        </div>
                    </div>
                </Modal.Body>
            </ModalDiv>
        </>
    )
}

export default Share;
