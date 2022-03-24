import { Tooltip, OverlayTrigger } from "react-bootstrap";
import React from "react";

import Icon from "/utilities/Icon";
 
import "bootstrap/dist/css/bootstrap.min.css";

 function Accessibility() {

    const handleHighContrast = () => {
        document.documentElement.classList.toggle("dark-mode");
    };
    
    return (
        <>
            <OverlayTrigger key="top"
                placement="top"
                overlay={< Tooltip id="tooltip-top" > Accessibility </Tooltip>}>
                <button className={"icon-btn"}
                    onClick={handleHighContrast} >
                    <Icon name="accessibility" />
                </button>
            </OverlayTrigger >
        </>
    );
}

export default Accessibility;