import React, { useState } from 'react';
import Aside from "./dashboardPage/Aside";
import "../styles/orderTablePage.css";
import Icon from './utilities/Icon';

export default function PersonalAreaPage(props) {
    const [collapsed, /*setCollapsed*/] = useState(false);
    const [toggled, setToggled] = useState(false);
    /*
        const handleCollapsedChange = (checked) => {
            setCollapsed(checked);
        };
    */
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <>
            <div className={`app ${toggled ? '' : ''}`}>
                <Aside
                    collapsed={collapsed}
                    toggled={toggled}
                    handleToggleSidebar={handleToggleSidebar}
                />
                <main>
                    <div className="btn-toggle" style={{
                        marginTop: "80px",
                        marginLeft: "20px"
                    }} onClick={() => handleToggleSidebar(true)}>
                        <Icon name="plus" />
                    </div>
                    {props.children}
                </main>
            </div>

        </>
    );
}

