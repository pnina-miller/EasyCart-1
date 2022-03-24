import React from 'react';
import { Modal } from 'react-bootstrap'

import UpLoadImgSection from '../../components/addBusinessPage‏/UpLoadImgSection';

import '../../styles/businessPage/businessPage.css'


function AddGalleryModal (props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={props.classModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter modalTitle" className='text-secondary fontHeader d-flex justify-content-start'>
                    <div className=' ml-4 font-weight-bold text-dark mt-3' >Add Image</div>
                    <hr className='mt-3 '></hr>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='addPadding'>
                <UpLoadImgSection></UpLoadImgSection>
            </Modal.Body>
        </Modal>
    )
}


export default AddGalleryModal;



