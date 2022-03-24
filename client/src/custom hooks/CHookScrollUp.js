import { useRef } from "react";
 import Icon from "../components/utilities/Icon"
const useScrollUp = () => {
  const scrollUpRef = useRef(null);

  const executeScroll = () => {
    scrollUpRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollUpButton = (
    <button
      style={{ position: "fixed", bottom: "0", right: "0", zIndex: "4" }}
      className={`arrow-up-container`}
      // className={`arrow-up-container ${show === true ? "d-block" : "d-none"}`}
      onClick={executeScroll}
    >
      <Icon name="arrowUp" />
    </button>
  );

  return { scrollUpRef, executeScroll, scrollUpButton };
};
export default useScrollUp;
