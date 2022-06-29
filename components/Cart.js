import React from 'react'
import Link from 'next/link'
import getStripe from '../lib/getStripe';

import { toast } from "react-hot-toast";


import { urlFor } from '../lib/client'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/MyStateContext'

const Cart = () => {
    const { setShowCart, cartItems, removeCartItem, addItemToCart, cartTotal } = useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className="cart-wrapper">
            <div className="cart-container">
                <button type='button' style={{ border: "none" }} className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Cart</span>
                    {/* <span className="cart-num-items">(2)</span> */}
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}


                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image)} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h6>{item.name}</h6>
                                    <h4>₹ {item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus"
                                                onClick={() => addItemToCart(item.name, item._id, 1, item.price, item.image, 'remove')}
                                            ><AiOutlineMinus />
                                            </span>
                                            <span className="num">{item.qty}</span>
                                            <span
                                                className="plus"
                                                onClick={() => addItemToCart(item.name, item._id, 1, item.price, item.image, 'add')}
                                            ><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() => removeCartItem(item)}
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cartItems.length >= 1 && (
                        <div className="cart-bottom">
                            <div className="total">
                                <h3>Subtotal:</h3>
                                <h3>₹ {cartTotal}</h3>
                            </div>
                            <div className="btn-container">
                                <button type="button" className="btn"
                                    onClick={handleCheckout}
                                >Pay with Stripe
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Cart