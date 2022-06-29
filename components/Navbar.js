import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart';
import { useStateContext } from '../context/MyStateContext'

const Navbar = () => {
    const { showCart, setShowCart } = useStateContext();


    return (
        <div className='navbar-container'>
            {/* <Context.Consumer>{val}</Context.Consumer> */}
            <p className="logo" style={{ fontSize: "20px", fontWeight: "700" }}>
                <Link href="/">e-commerce</Link>
            </p>

            <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
            </button>

            {showCart && <Cart />}
        </div>
    )
}

export default Navbar