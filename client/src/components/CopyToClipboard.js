import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Icon from './utilities/Icon'
// import '../styles/share.css';

function CopyToClipboard(props) {
  const { url } = props;

  const handleCopy = () => {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={<Tooltip id="tooltip-top">Copy to Clipboard</Tooltip>}
    >
      <button onClick={handleCopy} className="icon-btn">
        <Icon name="copy"/>
      </button>
    </OverlayTrigger>
  );
}

export default CopyToClipboard;