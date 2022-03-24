import styled, { css, keyframes } from 'styled-components';
import { slideInUp, slideInDown } from 'react-animations';
import { Modal } from 'react-bootstrap';

const mobileState = window.matchMedia('(max-width:600px)').matches;

const slideInAnimation = keyframes`${slideInUp}`;
const slideInDownAnimation = keyframes`${slideInDown}`;
export const DivQrCode = styled.span`
@media (max-width:600px){
    display: none;
}
`
export const ModalDiv = styled(Modal)`
animation: ${slideInDownAnimation} 0.5s;
@media (max-width: 600px) {
    animation: ${slideInAnimation} 0.5s;
    } 
}
`








