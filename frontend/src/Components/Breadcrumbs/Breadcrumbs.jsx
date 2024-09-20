import React from 'react'
import './Breadcrumbs.css'
import { VscChevronRight } from "react-icons/vsc";

// export const Breadcrumbs = (props) => {
//     const {product} = props;
//   return (
//     <div className='breadcrumbs'>
//         Home<VscChevronRight className='icons'/>Shop<VscChevronRight className='icons'/>{product.category}<VscChevronRight className='icons'/>{product.name}
//     </div>
//   )
// }


import { Link } from 'react-router-dom';

export const Breadcrumbs = (props) => {
    const { product } = props;
    return (
        <div className='breadcrumbs'>
            <Link to="/">Home</Link>
            <VscChevronRight className='icons' />
            <Link to="/">Shop</Link>
            <VscChevronRight className='icons' />
            <Link to={`/${product.category.toLowerCase()}`}>{product.category}</Link>
            <VscChevronRight className='icons' />
            {product.name}
        </div>
    );
}
