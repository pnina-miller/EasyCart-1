import React, { useState } from "react";
import validator from "validator";

import "../styles/genericInput.css";

function OurInput(props) {
  const {
    setState,
    setObjectState,
    objectKey,
    placeholder,
    required,
    className,
    type,
    defaultValue,
    ref,
    name,
    id,
    validatorFunc,
    validationMessage,
  } = props;

  const [error, setError] = useState(false);
  const [inputClassName, setInputClassName] = useState("");

  const handleBlur = (e) => {
    e.target.placeholder = defaultValue || placeholder;
   if (!e.target.value) {
      if (required) {
        setInputClassName("generic-input-error");
        return setError("input is required");
      } else {
        setInputClassName("");
        setError();
        return;
      }
    } 
    if(validatorFunc){
    if (validator[validatorFunc](e.target.value)) {
      setError(false);
      setInputClassName(" generic-input-correct");
    } else {
      setError(validationMessage);
      setInputClassName(" generic-input-error");
    }
  }else{
    setInputClassName("");
    setError();
    return;
  }
  };

  const handleChange = (e) => {
    if(validatorFunc){
      if (validator[validatorFunc](e.target.value)) {
        setError(false);
        setInputClassName(" generic-input-correct");
      } else {
        setError(validationMessage);
        setInputClassName(" generic-input-error");
      }
    }else{
      setInputClassName("");
      setError();
      return;
    }
    
    if (setObjectState) {
      let tempField = {};
      tempField[objectKey] = e.target.value;
      setObjectState((oldObj) => {
        return { ...oldObj, ...tempField };
      });
    } else setState(e.target.value);
  };
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        ref={ref}
        className={`${className} ${inputClassName}`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {error && <p className="generic-input-error-note">{error}</p>}
    </>
  );
}
export default OurInput;
