import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from "react-bootstrap"

import Icon from '../utilities/Icon'

import '../../styles/updateUserProfilePage.css'

function ContactInfo(props) {
    const { user } = props;
    return (
        <>
            <Container fluid>
                <Row>
                    {user && user.phone &&
                        <div>
                            <Link onClick={() => {
                                window.open(
                                    `sms://${user.phone}`,
                                    "_blank"
                                )
                            }} xs={2} className='svg-color-profile'> <Icon name='phoneProfile'></Icon></Link>
                        </div>}
                    &nbsp;
                    {user && user.links?.youTube &&
                        <div>
                            <Link onClick={() => {
                                window.open(`${user.links?.youTube}`, "_blank")
                            }} xs={2} className='svg-color-profile'> <Icon name='youtube'></Icon></Link>
                        </div>
                    }
                    &nbsp;
                    {user && user.links?.facebook &&
                        <div>
                            <Link onClick={() => {
                                window.open(`facebook://${user.links?.facebook}`, "_blank")
                            }} xs={2} className='svg-color-profile'> <Icon name='facebook'></Icon></Link>
                        </div>}
                    &nbsp;
                    {user && user.links?.twitter &&
                        <div>
                            <Link onClick={() => {
                                window.open(`${user.links?.twitter}`, "_blank")
                            }} xs={2} className='svg-color-profile'> <Icon name='twitter'></Icon></Link>
                        </div>}
                    &nbsp;
                    {user && user.links?.linkedin &&
                        <div>
                            <Link
                                onClick={() => {
                                    window.open(`${user.links?.linkedin}`, "_blank")
                                }} xs={2} className='svg-color-profile'> <Icon name='linkedin'></Icon></Link>
                        </div>}
                    &nbsp;
                    {user && user.links?.instagram &&
                        <div>

                            <Link xs={2} onClick={() => {
                                window.open(`${user.links?.instagram}`, "_blank")
                            }} className='svg-color-profile'> <Icon name='instagram'></Icon></Link>
                        </div>}
                </Row>
            </Container>
        </>
    )
}
export default (ContactInfo);