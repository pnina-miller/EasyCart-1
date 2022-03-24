
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

const ConfiguratorCatalog = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
    
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
                Catalog
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                    >
                      hh
                    </MenuItem>
                    <MenuItem
                    >
                       hh
                    </MenuItem>
                </Menu>
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
                                    <SubMenu title="vvv">
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

export default ConfiguratorCatalog;
