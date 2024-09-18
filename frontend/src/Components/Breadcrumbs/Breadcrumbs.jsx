import React from 'react'
import './Breadcrumbs.css'
import { VscChevronRight } from "react-icons/vsc";

export const Breadcrumbs = (props) => {
    const {product} = props;
  return (
    <div className='breadcrumbs'>
        Home<VscChevronRight className='icons'/>Shop<VscChevronRight className='icons'/>{product.category}<VscChevronRight className='icons'/>{product.name}
    </div>
  )
}
