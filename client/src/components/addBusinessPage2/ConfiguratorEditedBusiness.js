

import React from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { useTranslation } from 'react-i18next';
import { Col, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';


import Icon from "../utilities/Icon";
import AutoCompleteSearch from '../AutoCompleteSearch'


const ConfiguratorEditedBusiness = ({ collapsed, rtl, toggled, handleToggleSidebar, Business, setBusiness }) => {

    // const dispatch = useDispatch();
    const { t } = useTranslation();
    // let domine = "https://easycart.direct/";


    //functions

    /*async function checkKeyWords() {
        // if (editBusiness === "") {
        await dispatch(actions.checkKeyWords(Business.BusinessName));
        //   setFlagKeyWords(false);
        //   MyKeyWords(keyWords);
        // }
    }*/

    return (
        <ProSidebar
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Description
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarHeader className="m-2" iconShape="circle">

                    <Container>
                        <Row>

                            <Col>
                                Friendly Business Name
                                   <input
                                    className="input-business"
                                    onChange={(e) => {
                                        setBusiness({businessName: e.target.value });
                                    }}
                                    value={Business.businessName}></input>
                            </Col>

                        </Row>
                    </Container>
                </SidebarHeader>

                <SidebarHeader className="m-2" iconShape="circle">
                    <Container>
                        <Row>
                            <Col>
                                {t('location.location')}
                                <OverlayTrigger key="top"
                                    placement="top"
                                    overlay={
                                        <Tooltip id="tooltip-top">
                                            This field is required |
                                            must enter address  includding State City Street only
                                                </Tooltip>
                                    }>
                                    <button variant="outline-dark"
                                        className="icon-btn btnmul">
                                        <Icon name="information" />

                                    </button>
                                </OverlayTrigger>
                                <AutoCompleteSearch flag={"placeholderConfigurator"} cNAuto="auto-business" />
                            </Col>
                        </Row>
                    </Container>
                </SidebarHeader>

                <SidebarHeader className="m-2" iconShape="circle">
                    <Container>
                        <Row>
                            <Col>
                                Description
                                   <textarea
                                    as="textarea"
                                    className="input-business input-description"
                                    onChange={(e) => {
                                        setBusiness({description: e.target.value });
                                    }}
                                    value={Business.description}></textarea>
                            </Col>
                        </Row>
                    </Container>
                </SidebarHeader>



                <Menu iconShape="circle">
                    <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title="hh"
                    >
                        <MenuItem> 1</MenuItem>
                        <MenuItem> 2</MenuItem>
                        <MenuItem>
                            <Menu iconShape="circle">
                                <SubMenu
                                    suffix={<span className="badge yellow">3</span>}
                                    title="hh"
                                //   icon={<FaRegLaughWink />}{intl.formatMessage({ id: 'submenu' })}{intl.formatMessage({ id: 'submenu' })}{intl.formatMessage({ id: 'submenu' })}
                                >
                                    <MenuItem> 1</MenuItem>
                                    <MenuItem> 2</MenuItem>
                                    <MenuItem> 3</MenuItem>
                                </SubMenu>
                                <SubMenu
                                    prefix={<span className="badge gray">3</span>}
                                    title="hh"
                                //   icon={<FaHeart />}{intl.formatMessage({ id: 'submenu' })}{intl.formatMessage({ id: 'submenu' })}{intl.formatMessage({ id: 'submenu' })}
                                >
                                    <MenuItem> 1</MenuItem>
                                    <MenuItem> 2</MenuItem>
                                    <MenuItem> 3</MenuItem>
                                </SubMenu>
                                <SubMenu title="4" >
                                    {/* icon={<FaList />} */}
                                   hh
                                    <MenuItem> 2 </MenuItem>
                                    <SubMenu title="vvvv">
                                        <MenuItem>3.1 </MenuItem>
                                        <MenuItem> 3.2 </MenuItem>
                                        <SubMenu title="vvv">
                                            <MenuItem>3.3.1 </MenuItem>
                                            <MenuItem> 3.3.2 </MenuItem>
                                            <MenuItem> 3.3.3 </MenuItem>
                                        </SubMenu>
                                    </SubMenu>
                                </SubMenu>
                            </Menu>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        prefix={<span className="badge gray">3</span>}
                        title="7"
                    // icon={<FaHeart />}
                    >
                        <MenuItem> 1</MenuItem>
                        <MenuItem> 2</MenuItem>
                        <MenuItem> 3</MenuItem>
                    </SubMenu>
                    <SubMenu title="2" >
                        {/* icon={<FaList />} */}
                        <MenuItem> 1 </MenuItem>
                        <MenuItem> 2 </MenuItem>
                        <SubMenu title="3">
                            <MenuItem> 3.1 </MenuItem>
                            <MenuItem> 3.2 </MenuItem>
                            <SubMenu title="vvv">
                                <MenuItem>3.3.1 </MenuItem>
                                <MenuItem> 3.3.2 </MenuItem>
                                <MenuItem> 3.3.3 </MenuItem>
                            </SubMenu>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        {/* <FaGithub /> */}
                        <span> hh</span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default ConfiguratorEditedBusiness;
