import { useEffect, useRef } from "react"

export const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {

    const ref = useRef(null);

    useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [ref, indeterminate]);

  return (
    <input 
      className="form-check-input mt-0" 
      type="checkbox" 
      ref={ ref } 
      {...rest}
    />
  )
  
}
