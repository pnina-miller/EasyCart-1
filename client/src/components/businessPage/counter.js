import React, { useEffect } from "react";

import '../../styles/shoppingCart/counter.css'

function Counter(props) {

  const{ count, setCount }=props;
  const inputRef = React.createRef();

  const handleValueChange = (newValue, isField) => {
    newValue=parseInt(newValue,10)
    if (isField) {
      setCount(newValue)
      return
    }
    if (newValue < 0)
      newValue = 0
    if (inputRef.current) {
      if (newValue >= count)
        inputRef.current.className = 'counter-input counter-input-plus'
      else
        inputRef.current.className = 'counter-input counter-input-minus'

      setTimeout(() => setCount(newValue), 100)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current?.className === 'counter-input counter-input-plus')
        inputRef.current.className = inputRef.current.className = 'counter-input counter-input-after-plus'
      else
        if (inputRef.current?.className === 'counter-input counter-input-minus'){ 
          inputRef.current.className = inputRef.current.className = 'counter-input counter-input-after-minus'
        }
    }, 200)
    setTimeout(() => {
      if (inputRef.current?.className.includes('counter-input counter-input-after'))
        inputRef.current.className = inputRef.current.className = 'counter-input counter-input-after-after'
    }, 210)
     // eslint-disable-next-line
  }, [count])

  return (
    <div className='counter-counter' >
      <button
        className='counter-button'
        onClick={() => { handleValueChange(count - 1) }}
        title='-1'
      >
        −
          </button>
      <div className='counter-input-wrapper' >
        <input
          className='counter-input'
          maxlength={2}
          onChange={e => {
            e.preventDefault()
            handleValueChange(e.target.value, true)
          }}
          ref={inputRef}
          type='text'
          value={count}
        />
      </div>
      <button
        className='counter-button'
        onClick={() => { handleValueChange(count + 1) }}
        title='+1'
      >
        +
          </button>
    </div>
  )
}

export default Counter;