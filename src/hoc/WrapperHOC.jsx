import React from "react"
import { useSelector } from "react-redux"

export default function WrapperHoc(WrappedComponent) {
  return function WrapperWithRedux(props) {
    const {access:{ key,skip}} = props;
    const {plans} = useSelector((state) => state.plan)
    if(skip || plans[key]) return <WrappedComponent {...props} />
    return null
  }
}
